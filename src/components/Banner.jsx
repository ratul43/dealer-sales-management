import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Clock3,
  BellRing,
  ChartNoAxesCombined,
  CheckCircle2,
  Boxes,
} from "lucide-react";

const features = [
  {
    icon: Clock3,
    title: "Real-Time",
    secondLine: "Stock Tracking",
    description: "Know what's available at a glance.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: BellRing,
    title: "Stock Alerts &",
    secondLine: "Notifications",
    description: "Get notified before stock runs low.",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Inventory Reports",
    secondLine: "& Insights",
    description: "Track performance and spot growth opportunities.",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
];

export default function Banner() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50/60"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1600px] items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-2 lg:px-8 lg:py-20">
        {/* LEFT SIDE: Content */}
        <div className="relative z-10">
          {/* Label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-4 py-2 text-xs font-semibold text-indigo-700 sm:text-sm">
            <Boxes size={17} />
            Smarter Inventory Management for Dealers
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-4xl font-extrabold leading-[1.13] tracking-tight text-slate-950 sm:text-5xl xl:text-[56px]">
            Manage Your Stock,
            <br />
            Track Sales, Grow Your
            <br />
            Business{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              — All in One Place.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            DealerQuest helps you track inventory in real time, manage products,
            get low-stock alerts, and gain valuable insights — so you can make
            smarter decisions and grow your business.
          </p>

          {/* Feature cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 border-b border-slate-200 pb-4 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3 sm:last:border-r-0"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.iconBg} ${feature.iconColor} sm:mb-4`}
                  >
                    <Icon size={25} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold leading-5 text-slate-900 sm:min-h-10 sm:text-base">
                      {feature.title}
                      <br />
                      {feature.secondLine}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:text-base"
            >
              Get Started Free
              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white/80 px-5 py-3.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50 sm:text-base"
            >
              <Play size={17} />
              Explore Features
            </Link>
          </div>

          {/* Supporting text */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">
            <CheckCircle2 size={17} className="shrink-0 text-emerald-500" />
            <span>Organize inventory</span>
            <span className="text-slate-300">•</span>
            <span>Track sales</span>
            <span className="text-slate-300">•</span>
            <span>Make better decisions</span>
          </div>
        </div>

        {/* RIGHT SIDE: Generated illustration */}
        <div className="relative mx-auto w-full max-w-3xl lg:ml-auto lg:max-w-none lg:translate-x-4">
          {/* Decorative glow */}
          <div className="absolute inset-8 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="relative">
            <Image
              src="/images/banner.png"
              alt="DealerQuest inventory management dashboard and warehouse illustration"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="relative z-10 h-auto w-full scale-105 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
