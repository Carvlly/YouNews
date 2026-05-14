import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <header className="h-[64px] shrink-0 border-b border-border-base bg-bg-base px-4 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-[8px] sm:gap-[12px]">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono text-sm hidden sm:inline">Back</span>
          </Link>
          <div className="w-[1px] h-[24px] bg-border-base mx-2 hidden sm:block"></div>
          <div className="flex items-center gap-[6px] sm:gap-[8px] text-text-primary min-w-0">
            <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0 mix-blend-multiply dark:mix-blend-lighten opacity-80 z-0">
              <Image
                src="/logo.png"
                alt="YouNews Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain dark:invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="font-mono text-[16px] sm:text-[20px] font-bold text-text-primary z-10 truncate">
              YouNews{" "}
              <span className="hidden sm:inline font-normal opacity-50 text-[14px]">
                / About
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center shrink-0">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto w-full max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold font-mono text-text-primary mb-2">
              About YouNews
            </h1>
            <p className="text-text-secondary text-sm">
              v1.1.0 - High Density News Reader
            </p>
          </div>

          <div className="p-6 bg-bg-card border border-border-base rounded flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-accent font-bold uppercase tracking-wider text-xs font-mono">
                Important Notice 01
              </h2>
              <p className="text-text-primary text-sm leading-relaxed">
                当サイトは <strong>RSSフィードのみ</strong>{" "}
                を対象としてニュースを収集・表示しています。
              </p>
            </div>

            <div className="w-full h-[1px] bg-border-base"></div>

            <div className="flex flex-col gap-2">
              <h2 className="text-accent font-bold uppercase tracking-wider text-xs font-mono">
                Important Notice 02
              </h2>
              <p className="text-text-primary text-sm leading-relaxed">
                本サービスは現在 <strong>開発中 (Under Development)</strong>{" "}
                です。予期せぬ不具合や仕様変更が発生する可能性があります。
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-bg-hover text-text-primary text-sm font-mono uppercase tracking-wider rounded hover:bg-border-base transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
