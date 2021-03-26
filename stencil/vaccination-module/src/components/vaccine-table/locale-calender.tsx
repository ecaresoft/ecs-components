type MonthsNames = [string, string, string, string, string, string, string, string, string, string, string, string]
type DayNames = [string, string, string, string, string, string, string]

type DuetLocalizedText = {
  buttonLabel: string
  placeholder: string
  selectedDateMessage: string
  prevMonthLabel: string
  nextMonthLabel: string
  monthSelectLabel: string
  yearSelectLabel: string
  closeLabel: string
  keyboardInstruction: string
  calendarHeading: string
  dayNames: DayNames
  monthNames: MonthsNames
  monthNamesShort: MonthsNames
  locale: string | string[]
}

const localizationSpanish: DuetLocalizedText = {
  buttonLabel: "Selecciona una fecha",
  placeholder: "YYYY-MM-DD",
  selectedDateMessage: "La fecha seleccionada es",
  prevMonthLabel: "Mes anterior",
  nextMonthLabel: "Mex proximo",
  monthSelectLabel: "Mes",
  yearSelectLabel: "Año",
  closeLabel: "Cerrar ventana",
  keyboardInstruction: "Puedes usar las teclas flecha, para navegar",
  calendarHeading: "Selecciona una fecha",
  dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  locale: "es-MX",
}

const localizationEnglish: DuetLocalizedText = {
  buttonLabel: "Choose date",
  placeholder: "YYYY-MM-DD",
  selectedDateMessage: "Selected date is",
  prevMonthLabel: "Previous month",
  nextMonthLabel: "Next month",
  monthSelectLabel: "Month",
  yearSelectLabel: "Year",
  closeLabel: "Close window",
  keyboardInstruction: "You can use arrow keys to navigate dates",
  calendarHeading: "Choose a date",
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  locale: "en-US",
}


const localizationArabic: DuetLocalizedText = {
  buttonLabel: "حدد التاريخ",
  placeholder: "YYYY-MM-DD",
  selectedDateMessage: "التاريخ المحدد هو",
  prevMonthLabel: "الشهر الماضي",
  nextMonthLabel: "الشهر القادم",
  monthSelectLabel: "شهر",
  yearSelectLabel: "عام",
  closeLabel: "أغلق النافذة",
  keyboardInstruction: "يمكنك استخدام مفاتيح الأسهم للتنقل بين التواريخ",
  calendarHeading: "حدد التاريخ",
  dayNames: ["الأحد" ,
             "الاثنين",
             "يوم الثلاثاء", 
             "الأربعاء", 
             "يوم الخميس", 
             "جمعة", 
             "السبت"],
  monthNames: [
    "يناير",
    "شهر فبراير",
    "مارس",
    "أبريل",
    "يمكن",
    "يونيو",
    "تموز",
    "أغسطس",
    "أيلول",
    "اكتوبر",
    "شهر نوفمبر",
    "ديسمبر",
  ],
  monthNamesShort: [
  "يناير", 
  "فبراير", 
  "مارس", 
  "أبريل", 
  "مايو", 
  "يونيو",
  "تموز",
  "أغسطس",
  "سبتمبر",
  "اكتوبر",
  "شهر نوفمبر",
  "ديسمبر"],
  locale: "ar-Ar",
}

export { localizationSpanish, localizationEnglish, localizationArabic, DuetLocalizedText }