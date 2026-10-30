import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/lib/ContentContext";
import { ADMIN } from "@/lib/content";

type TabKey =
  | "hero"
  | "pokemon"
  | "manifesto"
  | "classes"
  | "instructors"
  | "membership"
  | "media"
  | "footer";

export function AdminCMS() {
  const {
    content,
    updateHero,
    updateMedia,
    updatePokemonCard,
    updateManifesto,
    updatePillar,
    updateClasses,
    updateClassItem,
    updateInstructors,
    updateInstructorItem,
    updateMembership,
    updateMembershipPlan,
    updateJoin,
    updateFooter,
    resetToDefaults,
    isAuthenticated,
    login,
    logout,
    isEditorOpen,
    setIsEditorOpen,
    isLoginOpen,
    setIsLoginOpen,
  } = useContent() as any;

  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleOpenLogin = () => {
    if (isAuthenticated) {
      setIsEditorOpen(true);
    } else {
      setIsLoginOpen(true);
      setLoginError(false);
    }
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    const success = login(usernameInput, passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setUsernameInput("");
      setPasswordInput("");
    }
  };

  const handleExport = () => {
    try {
      const jsonStr = JSON.stringify(content, null, 2);
      navigator.clipboard.writeText(jsonStr);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    if (window.confirm(ADMIN.resetConfirm)) {
      resetToDefaults();
    }
  };

  return (
    <>
      {/* 1. Botón Flotante para abrir el Editor */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={handleOpenLogin}
          aria-label={ADMIN.triggerButton}
          className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-deep/90 px-4 py-2.5 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-cyan/95 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          <span
            aria-hidden
            className="flex size-2 rounded-full bg-emerald-400 animate-pulse"
          />
          <svg
            className="size-4 shrink-0 transition-transform duration-300 group-hover:rotate-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span>{ADMIN.triggerButton}</span>
        </button>
      </div>

      {/* 2. Modal de Login */}
      <AnimatePresence>
        {isLoginOpen && !isAuthenticated && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginOpen(false)}
              className="absolute inset-0 bg-abyss/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-deep/95 p-6 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-white">
                    <svg
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {ADMIN.modalTitle}
                    </h3>
                    <p className="text-xs text-white/70">
                      {ADMIN.modalSubtitle}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoginOpen(false)}
                  className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="sr-only">{ADMIN.closeButton}</span>
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
                {loginError && (
                  <div className="rounded-lg bg-rose-500/20 border border-rose-500/40 px-3.5 py-2.5 text-xs text-rose-200">
                    {ADMIN.loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                    {ADMIN.usernameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder={ADMIN.usernamePlaceholder}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 transition-all focus:border-white focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1.5">
                    {ADMIN.passwordLabel}
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder={ADMIN.passwordPlaceholder}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 transition-all focus:border-white focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-deep shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {ADMIN.loginButton}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Panel Lateral / Drawer del Editor Completo */}
      <AnimatePresence>
        {isEditorOpen && isAuthenticated && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="absolute inset-0 bg-abyss/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative flex h-full w-full max-w-2xl flex-col border-l border-white/20 bg-ink/95 shadow-2xl backdrop-blur-2xl"
            >
              {/* Header del Drawer */}
              <div className="flex items-center justify-between border-b border-white/15 px-6 py-4 bg-deep/80">
                <div className="flex items-center gap-3">
                  <span className="flex size-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h2 className="text-base font-bold text-white">
                      {ADMIN.editorTitle}
                    </h2>
                    <p className="text-xs text-white/70">
                      {ADMIN.editorSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500/30 hover:border-rose-400 transition-colors"
                  >
                    {ADMIN.logoutButton}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <svg
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="sr-only">{ADMIN.closeButton}</span>
                  </button>
                </div>
              </div>

              {/* Barra de pestañas */}
              <div className="flex overflow-x-auto border-b border-white/10 bg-white/5 px-4 py-2 scrollbar-none gap-1.5">
                {(
                  [
                    ["hero", ADMIN.tabs.hero],
                    ["pokemon", ADMIN.tabs.pokemon],
                    ["media", ADMIN.tabs.media],
                    ["manifesto", ADMIN.tabs.manifesto],
                    ["classes", ADMIN.tabs.classes],
                    ["instructors", ADMIN.tabs.instructors],
                    ["membership", ADMIN.tabs.membership],
                    ["footer", ADMIN.tabs.footer],
                  ] as const
                ).map(([tabKey, tabLabel]) => (
                  <button
                    key={tabKey}
                    type="button"
                    onClick={() => setActiveTab(tabKey)}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      activeTab === tabKey
                        ? "bg-white text-deep shadow"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {tabLabel}
                  </button>
                ))}
              </div>

              {/* Contenido de cada pestaña */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* TAB: HERO & MARCA */}
                {activeTab === "hero" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                        {ADMIN.fields.brandName}
                      </label>
                      <input
                        type="text"
                        value={content.hero.brand}
                        onChange={(e) => updateHero({ brand: e.target.value })}
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.brandLine1}
                        </label>
                        <input
                          type="text"
                          value={content.hero.brandParts.line1}
                          onChange={(e) =>
                            updateHero({
                              brandParts: {
                                ...content.hero.brandParts,
                                line1: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.brandLine2}
                        </label>
                        <input
                          type="text"
                          value={content.hero.brandParts.line2}
                          onChange={(e) =>
                            updateHero({
                              brandParts: {
                                ...content.hero.brandParts,
                                line2: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.tagline1}
                        </label>
                        <input
                          type="text"
                          value={content.hero.tagline[0][0]}
                          onChange={(e) =>
                            updateHero({
                              tagline: [
                                [e.target.value, content.hero.tagline[0][1]],
                                content.hero.tagline[1],
                              ],
                            })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.tagline2}
                        </label>
                        <input
                          type="text"
                          value={content.hero.tagline[0][1]}
                          onChange={(e) =>
                            updateHero({
                              tagline: [
                                [content.hero.tagline[0][0], e.target.value],
                                content.hero.tagline[1],
                              ],
                            })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.tagline3}
                        </label>
                        <input
                          type="text"
                          value={content.hero.tagline[1][0]}
                          onChange={(e) =>
                            updateHero({
                              tagline: [
                                content.hero.tagline[0],
                                [e.target.value, content.hero.tagline[1][1]],
                              ],
                            })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.tagline4}
                        </label>
                        <input
                          type="text"
                          value={content.hero.tagline[1][1]}
                          onChange={(e) =>
                            updateHero({
                              tagline: [
                                content.hero.tagline[0],
                                [content.hero.tagline[1][0], e.target.value],
                              ],
                            })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                        {ADMIN.fields.heroBody}
                      </label>
                      <textarea
                        rows={3}
                        value={content.hero.body}
                        onChange={(e) => updateHero({ body: e.target.value })}
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.heroBtn1}
                        </label>
                        <input
                          type="text"
                          value={content.hero.buttons[0]?.label || ""}
                          onChange={(e) => {
                            const btns = [...content.hero.buttons];
                            btns[0] = { ...btns[0], label: e.target.value };
                            updateHero({ buttons: btns });
                          }}
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.heroBtn2}
                        </label>
                        <input
                          type="text"
                          value={content.hero.buttons[1]?.label || ""}
                          onChange={(e) => {
                            const btns = [...content.hero.buttons];
                            btns[1] = { ...btns[1], label: e.target.value };
                            updateHero({ buttons: btns });
                          }}
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: CARTAS POKÉMON */}
                {activeTab === "pokemon" && (
                  <div className="space-y-4">
                    {content.media.pokemonCards.map((card: any, idx: number) => (
                      <div
                        key={card.id}
                        className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={card.src}
                            alt={card.name}
                            className="size-12 rounded object-cover border border-white/20"
                          />
                          <div className="flex-1">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                              {ADMIN.fields.cardTitle}
                            </label>
                            <input
                              type="text"
                              value={card.name}
                              onChange={(e) =>
                                updatePokemonCard(idx, { name: e.target.value })
                              }
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                            {ADMIN.fields.cardUrl}
                          </label>
                          <input
                            type="text"
                            value={card.src}
                            onChange={(e) =>
                              updatePokemonCard(idx, { src: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB: IMÁGENES & LOGO */}
                {activeTab === "media" && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={content.media.logomark}
                          alt=""
                          className="size-12 rounded-lg object-contain bg-white/10 p-1 border border-white/20"
                        />
                        <div className="flex-1">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                            {ADMIN.fields.logoImage}
                          </label>
                          <input
                            type="text"
                            value={content.media.logomark}
                            onChange={(e) =>
                              updateMedia({ logomark: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={content.media.dancer}
                          alt=""
                          className="size-16 rounded-lg object-cover bg-white/10 border border-white/20"
                        />
                        <div className="flex-1">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                            {ADMIN.fields.heroDancerImage}
                          </label>
                          <input
                            type="text"
                            value={content.media.dancer}
                            onChange={(e) =>
                              updateMedia({ dancer: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white font-mono focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: MANIFIESTO */}
                {activeTab === "manifesto" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                        {ADMIN.fields.manifestoKicker}
                      </label>
                      <input
                        type="text"
                        value={content.manifesto.kicker}
                        onChange={(e) =>
                          updateManifesto({ kicker: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                        {ADMIN.fields.manifestoTitle}
                      </label>
                      <input
                        type="text"
                        value={content.manifesto.title}
                        onChange={(e) =>
                          updateManifesto({ title: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                        {ADMIN.fields.manifestoLead}
                      </label>
                      <textarea
                        rows={3}
                        value={content.manifesto.lead}
                        onChange={(e) =>
                          updateManifesto({ lead: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      {content.manifesto.pillars.map((pillar: any, idx: number) => (
                        <div
                          key={pillar.number}
                          className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-2"
                        >
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/80">
                            {ADMIN.fields.itemTitle} {pillar.number}
                          </label>
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) =>
                              updatePillar(idx, { title: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                          />
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/80">
                            {ADMIN.fields.itemDesc}
                          </label>
                          <textarea
                            rows={2}
                            value={pillar.description}
                            onChange={(e) =>
                              updatePillar(idx, { description: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB: CLASES */}
                {activeTab === "classes" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.classesKicker}
                        </label>
                        <input
                          type="text"
                          value={content.classes.kicker}
                          onChange={(e) =>
                            updateClasses({ kicker: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.classesTitle}
                        </label>
                        <input
                          type="text"
                          value={content.classes.title}
                          onChange={(e) =>
                            updateClasses({ title: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                        {ADMIN.fields.classesLead}
                      </label>
                      <textarea
                        rows={2}
                        value={content.classes.lead}
                        onChange={(e) =>
                          updateClasses({ lead: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      {content.classes.items.map((item: any, idx: number) => (
                        <div
                          key={item.id}
                          className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-2"
                        >
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                                {ADMIN.fields.itemTitle}
                              </label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) =>
                                  updateClassItem(idx, {
                                    title: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                                {ADMIN.fields.itemDuration}
                              </label>
                              <input
                                type="text"
                                value={item.duration}
                                onChange={(e) =>
                                  updateClassItem(idx, {
                                    duration: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                              {ADMIN.fields.itemDesc}
                            </label>
                            <textarea
                              rows={2}
                              value={item.description}
                              onChange={(e) =>
                                updateClassItem(idx, {
                                  description: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB: INSTRUCTORES */}
                {activeTab === "instructors" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.instructorsKicker}
                        </label>
                        <input
                          type="text"
                          value={content.instructors.kicker}
                          onChange={(e) =>
                            updateInstructors({ kicker: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.instructorsTitle}
                        </label>
                        <input
                          type="text"
                          value={content.instructors.title}
                          onChange={(e) =>
                            updateInstructors({ title: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {content.instructors.items.map((inst: any, idx: number) => (
                        <div
                          key={inst.id}
                          className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-2"
                        >
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                                {ADMIN.fields.itemName}
                              </label>
                              <input
                                type="text"
                                value={inst.name}
                                onChange={(e) =>
                                  updateInstructorItem(idx, {
                                    name: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                                {ADMIN.fields.itemRole}
                              </label>
                              <input
                                type="text"
                                value={inst.role}
                                onChange={(e) =>
                                  updateInstructorItem(idx, {
                                    role: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                                {ADMIN.fields.itemYears}
                              </label>
                              <input
                                type="text"
                                value={inst.years}
                                onChange={(e) =>
                                  updateInstructorItem(idx, {
                                    years: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                              {ADMIN.fields.itemBio}
                            </label>
                            <textarea
                              rows={2}
                              value={inst.bio}
                              onChange={(e) =>
                                updateInstructorItem(idx, {
                                  bio: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB: MEMBRESÍAS */}
                {activeTab === "membership" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.membershipKicker}
                        </label>
                        <input
                          type="text"
                          value={content.membership.kicker}
                          onChange={(e) =>
                            updateMembership({ kicker: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.membershipTitle}
                        </label>
                        <input
                          type="text"
                          value={content.membership.title}
                          onChange={(e) =>
                            updateMembership({ title: e.target.value })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {content.membership.items.map((plan: any, idx: number) => (
                        <div
                          key={plan.id}
                          className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-2"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                                {ADMIN.fields.planName}
                              </label>
                              <input
                                type="text"
                                value={plan.name}
                                onChange={(e) =>
                                  updateMembershipPlan(idx, {
                                    name: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                                {ADMIN.fields.planPrice}
                              </label>
                              <input
                                type="number"
                                value={plan.monthly}
                                onChange={(e) =>
                                  updateMembershipPlan(idx, {
                                    monthly: Number(e.target.value) || 0,
                                  })
                                }
                                className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                              {ADMIN.fields.planDesc}
                            </label>
                            <input
                              type="text"
                              value={plan.description}
                              onChange={(e) =>
                                updateMembershipPlan(idx, {
                                  description: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                              {ADMIN.fields.planCta}
                            </label>
                            <input
                              type="text"
                              value={plan.cta}
                              onChange={(e) =>
                                updateMembershipPlan(idx, {
                                  cta: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB: PIE & CONTACTO */}
                {activeTab === "footer" && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                            {ADMIN.fields.joinTitle1}
                          </label>
                          <input
                            type="text"
                            value={content.join.titlePart1}
                            onChange={(e) =>
                              updateJoin({ titlePart1: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                            {ADMIN.fields.joinTitle2}
                          </label>
                          <input
                            type="text"
                            value={content.join.titlePart2}
                            onChange={(e) =>
                              updateJoin({ titlePart2: e.target.value })
                            }
                            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.joinButton}
                        </label>
                        <input
                          type="text"
                          value={content.join.buttonSubmit}
                          onChange={(e) =>
                            updateJoin({ buttonSubmit: e.target.value })
                          }
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.footerWordmark}
                        </label>
                        <input
                          type="text"
                          value={content.footer.wordmark}
                          onChange={(e) =>
                            updateFooter({ wordmark: e.target.value })
                          }
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.footerDesc}
                        </label>
                        <textarea
                          rows={2}
                          value={content.footer.description}
                          onChange={(e) =>
                            updateFooter({ description: e.target.value })
                          }
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          {ADMIN.fields.footerCopyright}
                        </label>
                        <input
                          type="text"
                          value={content.footer.copyright}
                          onChange={(e) =>
                            updateFooter({ copyright: e.target.value })
                          }
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer de Acciones del Drawer */}
              <div className="border-t border-white/15 bg-deep/80 px-6 py-4 flex items-center justify-between">
                <span className="text-xs text-emerald-300 font-medium flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  {ADMIN.saveNotice}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-rose-500/20 hover:text-rose-200 hover:border-rose-400/40 transition-colors"
                  >
                    {ADMIN.resetButton}
                  </button>

                  <button
                    type="button"
                    onClick={handleExport}
                    className="rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-deep shadow hover:scale-105 active:scale-95 transition-transform"
                  >
                    {copyFeedback ? ADMIN.copiedNotice : ADMIN.exportButton}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
