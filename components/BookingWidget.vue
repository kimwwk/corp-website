<script setup lang="ts">
const config = useRuntimeConfig()

// ---- Eastern Time date helpers (visitors may be anywhere) ----
function etTodayStr(): string {
  // en-CA gives YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto' }).format(new Date())
}
function addDays(ymd: string, days: number): string {
  const [y, m, d] = ymd.split('-').map(Number)
  const dt = new Date(y, m - 1, d + days)
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
}
function dayOfWeek(ymd: string): number {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).getDay()
}
function prettyDate(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

const today = etTodayStr()
const minDate = addDays(today, 1) // no same-day bookings
const maxDate = addDays(today, 14) // up to two weeks out

function isBookable(ymd: string): boolean {
  const dow = dayOfWeek(ymd)
  return ymd >= minDate && ymd <= maxDate && dow >= 1 && dow <= 5 // weekdays only
}

// ---- Calendar grid ----
const viewYear = ref(Number(today.slice(0, 4)))
const viewMonth = ref(Number(today.slice(5, 7))) // 1-based

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
)

interface DayCell { ymd: string, day: number, inMonth: boolean, bookable: boolean, isToday: boolean }

const grid = computed<DayCell[]>(() => {
  const first = new Date(viewYear.value, viewMonth.value - 1, 1)
  const start = new Date(first)
  start.setDate(1 - first.getDay()) // back to Sunday
  const cells: DayCell[] = []
  for (let i = 0; i < 42; i++) {
    const dt = new Date(start)
    dt.setDate(start.getDate() + i)
    const ymd = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
    cells.push({
      ymd,
      day: dt.getDate(),
      inMonth: dt.getMonth() === viewMonth.value - 1,
      bookable: isBookable(ymd),
      isToday: ymd === today,
    })
  }
  return cells
})

const canPrev = computed(() => `${viewYear.value}-${String(viewMonth.value).padStart(2, '0')}` > minDate.slice(0, 7))
const canNext = computed(() => `${viewYear.value}-${String(viewMonth.value).padStart(2, '0')}` < maxDate.slice(0, 7))

function prevMonth() {
  if (!canPrev.value) return
  if (viewMonth.value === 1) { viewMonth.value = 12; viewYear.value-- }
  else viewMonth.value--
}
function nextMonth() {
  if (!canNext.value) return
  if (viewMonth.value === 12) { viewMonth.value = 1; viewYear.value++ }
  else viewMonth.value++
}

// ---- Slots: 10am–4pm ET, hourly starts (45-min call fits before 4pm) ----
const slots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']

const selectedDate = ref('')
const selectedTime = ref('')

function pickDate(cell: DayCell) {
  if (!cell.bookable) return
  selectedDate.value = cell.ymd
  selectedTime.value = ''
}

// ---- Details form ----
const form = reactive({ name: '', email: '', company: '', phone: '', notes: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const canSubmit = computed(() =>
  !!selectedDate.value && !!selectedTime.value && !!form.name.trim() && !!form.email.trim() && status.value !== 'sending',
)

async function submit() {
  if (!canSubmit.value) return
  status.value = 'sending'
  try {
    const url = config.public.n8nBookingWebhookUrl
    if (!url) throw new Error('webhook-not-configured')
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        date: selectedDate.value,
        time: selectedTime.value,
        timezone: 'America/Toronto (ET)',
        source: 'kivov-website',
        submittedAt: new Date().toISOString(),
      }),
    })
    if (!res.ok) throw new Error(`status-${res.status}`)
    status.value = 'success'
  } catch (err) {
    console.error('Booking submission failed:', err)
    status.value = 'error'
  }
}
</script>

<template>
  <!-- Success state -->
  <div v-if="status === 'success'" class="card border-brand/40" role="status">
    <div class="flex items-start gap-4">
      <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 class="text-ink font-semibold mb-2">Request received!</h3>
        <p class="text-body leading-relaxed">
          You asked for <span class="text-ink font-medium">{{ prettyDate(selectedDate) }} at {{ selectedTime }} (ET)</span>.
          We'll confirm by email within the business day and send you the meeting link.
        </p>
      </div>
    </div>
  </div>

  <div v-else class="card md:p-10">
    <div class="grid lg:grid-cols-2 gap-10">
      <!-- Step 1: date & time -->
      <div>
        <h3 class="text-ink font-semibold text-lg mb-1">1. Select date &amp; time</h3>
        <p class="text-muted text-sm mb-6">Weekdays, next two weeks · All times Eastern (ET)</p>

        <!-- Month nav -->
        <div class="flex items-center justify-between mb-4">
          <button
            type="button"
            class="p-2 rounded-md border border-line text-body hover:text-ink hover:border-ink/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="!canPrev"
            aria-label="Go to previous month"
            @click="prevMonth"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p class="text-ink font-medium">{{ monthLabel }}</p>
          <button
            type="button"
            class="p-2 rounded-md border border-line text-body hover:text-ink hover:border-ink/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="!canNext"
            aria-label="Go to next month"
            @click="nextMonth"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Weekday header -->
        <div class="grid grid-cols-7 mb-1" aria-hidden="true">
          <span v-for="d in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="d" class="text-center text-muted text-xs font-mono py-1">{{ d }}</span>
        </div>

        <!-- Day grid -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="cell in grid"
            :key="cell.ymd"
            type="button"
            class="aspect-square rounded-md text-sm transition-colors"
            :class="[
              !cell.inMonth ? 'text-muted/40' : '',
              cell.bookable
                ? (selectedDate === cell.ymd
                  ? 'bg-brand text-white font-semibold'
                  : 'text-ink hover:bg-black/5 border border-line')
                : 'text-muted/50 cursor-not-allowed',
              cell.isToday && selectedDate !== cell.ymd ? 'border border-brand/50' : '',
            ]"
            :disabled="!cell.bookable"
            :aria-label="cell.bookable ? `Book ${cell.ymd}` : undefined"
            :aria-pressed="selectedDate === cell.ymd"
            @click="pickDate(cell)"
          >
            {{ cell.day }}
          </button>
        </div>

        <!-- Time slots -->
        <div v-if="selectedDate" class="mt-6">
          <p class="text-body text-sm mb-3">Available times for <span class="text-ink font-medium">{{ prettyDate(selectedDate) }}</span></p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="slot in slots"
              :key="slot"
              type="button"
              class="py-2.5 px-3 rounded-md text-sm border transition-colors"
              :class="selectedTime === slot
                ? 'bg-brand text-white font-semibold border-brand'
                : 'text-body border-line hover:border-ink/30 hover:text-ink'"
              :aria-pressed="selectedTime === slot"
              @click="selectedTime = slot"
            >
              {{ slot }}
            </button>
          </div>
        </div>
        <p v-else class="mt-6 text-muted text-sm">Pick a date to see available times.</p>
      </div>

      <!-- Step 2: details -->
      <div>
        <h3 class="text-ink font-semibold text-lg mb-1">2. Your details</h3>
        <p class="text-muted text-sm mb-6">We'll confirm your slot by email — no card, no commitment.</p>

        <form @submit.prevent="submit">
          <div class="space-y-5">
            <div>
              <label for="bk-name" class="form-label">Your name <span class="text-brand">*</span></label>
              <input id="bk-name" v-model="form.name" type="text" name="name" required autocomplete="name" class="form-input" placeholder="Jane Doe">
            </div>
            <div>
              <label for="bk-email" class="form-label">Work email <span class="text-brand">*</span></label>
              <input id="bk-email" v-model="form.email" type="email" name="email" required autocomplete="email" class="form-input" placeholder="jane@yourcompany.com">
            </div>
            <div>
              <label for="bk-company" class="form-label">Company</label>
              <input id="bk-company" v-model="form.company" type="text" name="company" autocomplete="organization" class="form-input" placeholder="Your company name">
            </div>
            <div>
              <label for="bk-phone" class="form-label">Phone</label>
              <input id="bk-phone" v-model="form.phone" type="tel" name="phone" autocomplete="tel" class="form-input" placeholder="Optional">
            </div>
            <div>
              <label for="bk-notes" class="form-label">Anything else we should know?</label>
              <textarea id="bk-notes" v-model="form.notes" name="notes" rows="3" class="form-input resize-y" placeholder="Optional — what does your business do, where does your time go?" />
            </div>
          </div>

          <div v-if="status === 'error'" class="mt-5 card border-red-300 bg-red-50" role="alert">
            <p class="text-body text-sm leading-relaxed">
              Hmm — something went wrong. Please email us at
              <a href="mailto:hello@kivov.work?subject=Free%20AI%20assessment%20booking" class="text-brand hover:text-brand-deep transition-colors font-medium">hello@kivov.work</a>
              with your preferred time.
            </p>
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="btn-primary w-full justify-center"
              :disabled="!canSubmit"
              :class="{ 'opacity-50 cursor-not-allowed': !canSubmit }"
            >
              {{ status === 'sending' ? 'Sending…' : 'Confirm assessment' }}
            </button>
            <p class="text-muted text-sm mt-3 text-center">
              <template v-if="selectedDate && selectedTime">
                {{ prettyDate(selectedDate) }} at {{ selectedTime }} (ET) · 45 minutes · Free
              </template>
              <template v-else>
                Select a date and time first
              </template>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
