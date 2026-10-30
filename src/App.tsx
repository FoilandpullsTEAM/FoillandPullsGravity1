import { Header } from "@/components/sections/Header";
import { ScrollProgress } from "@/components/sections/ScrollProgress";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { AdminCMS } from "@/components/admin/AdminCMS";
import { ContentProvider } from "@/lib/ContentContext";
import { BACKGROUNDS } from "@/lib/content";
import { sectionsIn } from "@/sections";

export default function App() {
  const topSections = sectionsIn(undefined);
  const bodySections = sectionsIn("body");

  return (
    <ContentProvider>
      <main className="relative min-h-screen w-full">
        {/* 1. Barra de progreso superior */}
        <ScrollProgress />

        {/* 2. Cabecera fija con efecto scroll glass */}
        <Header />

        {/* 3. Secciones principales superiores (Hero) */}
        {topSections.map((sec) => (
          <sec.Component key={sec.id} />
        ))}

        {/* 4. Secciones posteriores bajo el fondo degradado común */}
        <div className="relative isolate w-full">
          <SectionBackdrop layers={BACKGROUNDS.body} className="-z-10" />
          {bodySections.map((sec) => (
            <sec.Component key={sec.id} />
          ))}
        </div>

        {/* 5. Editor CMS Online con Login */}
        <AdminCMS />
      </main>
    </ContentProvider>
  );
}
