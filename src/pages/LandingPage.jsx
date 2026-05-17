import { Link } from 'react-router-dom'
// import PropertyBackground from '../../assets/PropertyBackground.png'
// import LogoPic from '../../assets/LogoPic.png'

// const heroBackground = '../assets/PropertyBackground.png';
const featureCards = [
  {
    title: 'توفير المال',
    description:
      'وفر مالك واحفظه من الضياع عن طريق استخدام الوسطاء وارفع إعلان عقارك الان على المنصة.',
    tone: 'gold',
    icon: '/MoneyIcon.png',
    // (
    //   <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="1.8"
    //       d="M12 8c-2.5 0-4.5 2-4.5 4.5S9.5 17 12 17s4.5-2 4.5-4.5S14.5 8 12 8z"
    //     />
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="1.8"
    //       d="M9 4h6m-6 16h6M5 8l2 12m12-12-2 12"
    //     />
    //   </svg>
    // ),
  },
  {
    title: 'كسب الوقت',
    description:
      'بدلا من تضيع الوقت في البحث عن عقار مناسب يمكنك كسب الوقت وإيجاد العقار المناسب بسرعة.',
    tone: 'blue',
    icon: '/TimeIcon.png',
    // (
    //   <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //     <circle cx="12" cy="12" r="8" strokeWidth="1.8" />
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="1.8"
    //       d="M12 8v4l3 2M7 3l2 2m6-2-2 2"
    //     />
    //   </svg>
    // ),
  },
  {
    title: 'الموثوقية',
    description:
      'اعلى درجة موثوقية مع خدمة المحاميين لضمان الحصول على خدمة امنة ومتكاملة.',
    tone: 'gold',
    icon: '/SecurityIcon.png',
    // (
    //   <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="1.8"
    //       d="M12 3 4.5 6v6.5c0 4.2 3 8 7.5 8.5 4.5-.5 7.5-4.3 7.5-8.5V6L12 3z"
    //     />
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="1.8"
    //       d="m9.5 12 1.8 1.8 3.2-3.2"
    //     />
    //   </svg>
    // ),
  },
]

function BrandLogoPic() {
  return (
    <div className="h-22 w-24 rounded-full border-gray-200  p-1">
      <img src='/LogoPic.png' alt="logoPic" className="w-[65px] h-[65px]" />
    </div>
  )
}

function FeatureCard({ item }) {
  const toneClass =
    item.tone === 'gold'
      ? 'bg-[#c0a253] text-white'
      : 'bg-primary text-white'

  return (
    <article
      className={`group rounded-xl p-8 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${toneClass}`}
    >
      <div className="mb-4 flex justify-center opacity-90 transition group-hover:scale-110 group-hover:opacity-100">
        <img src={item.icon} alt={item.title} />
      </div>
      <h3 className="mb-4 text-4xl font-bold">{item.title}</h3>
      <p className="mx-auto max-w-[260px] text-2xl leading-relaxed opacity-95">
        {item.description}
      </p>
    </article>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#efefef]" dir="rtl">
      <section
        className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-4"
        style={{
          backgroundImage: `url(/PropertyBackground.png)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/55 to-primary/95" />
        <div className="absolute -left-24 top-16 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-4 right-8 h-52 w-52 rounded-full bg-[#c0a253]/20 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="mb-16 flex justify-start md:mb-20">
            <BrandLogoPic />
          </div>

          <div className="mx-auto max-w-3xl text-center text-white">
            <h1 className="mb-5 text-5xl font-bold leading-tight md:text-6xl">
              اقوى منصة عقارية
              <br />
              في السودان
            </h1>
            <p className="mb-8 text-4xl font-semibold text-white/95 md:text-5xl">
              وفر وقتك، جهدك و مالك..!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/login"
                className="rounded bg-primary px-10 py-3 text-2xl font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-secondary"
              >
                تسجيل دخول
              </Link>
              <Link
                to="/register"
                className="rounded bg-[#c0a253] px-10 py-3 text-2xl font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#b08f3f]"
              >
                تسجيل حساب جديد
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-5xl font-bold text-gray-900">
            مميزات المنصة
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featureCards.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5 text-xl md:text-2xl">
            <p className="font-medium text-gray-800 w-full text-center ">
              انضم لمنصة العقارات لتتمتع بجميع هذه الميزات
            </p>
            <Link
              to="/login"
              className="rounded bg-primary px-10 py-3 font-bold text-white transition hover:bg-secondary"
            >
              تسجيل دخول
            </Link>
            <Link
              to="/register"
              className="rounded bg-[#c0a253] px-10 py-3 font-bold text-white transition hover:bg-[#b08f3f]"
            >
              تسجيل حساب جديد
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-primary py-4 text-center text-xl text-white/90">
        حقوق النشر محفوظة {new Date().getFullYear()}
      </footer>
    </div>
  )
}
