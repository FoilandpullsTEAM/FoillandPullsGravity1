import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  HERO,
  MEDIA,
  MANIFESTO,
  CLASSES,
  INSTRUCTORS,
  PLANS,
  JOIN,
  FOOTER_LINKS,
} from "@/lib/content";

const STORAGE_KEY = "foillandpulls_site_content";
const AUTH_KEY = "foillandpulls_admin_auth";

export type ContentState = {
  hero: typeof HERO;
  media: typeof MEDIA;
  manifesto: typeof MANIFESTO;
  classes: typeof CLASSES;
  instructors: typeof INSTRUCTORS;
  membership: typeof PLANS;
  join: typeof JOIN;
  footer: typeof FOOTER_LINKS;
};

const DEFAULT_STATE: ContentState = {
  hero: HERO,
  media: MEDIA,
  manifesto: MANIFESTO,
  classes: CLASSES,
  instructors: INSTRUCTORS,
  membership: PLANS,
  join: JOIN,
  footer: FOOTER_LINKS,
};

type ContentContextType = {
  content: ContentState;
  updateHero: (patch: any) => void;
  updateMedia: (patch: any) => void;
  updatePokemonCard: (index: number, patch: any) => void;
  updateManifesto: (patch: any) => void;
  updatePillar: (index: number, patch: any) => void;
  updateClasses: (patch: any) => void;
  updateClassItem: (index: number, patch: any) => void;
  updateInstructors: (patch: any) => void;
  updateInstructorItem: (index: number, patch: any) => void;
  updateMembership: (patch: any) => void;
  updateMembershipPlan: (index: number, patch: any) => void;
  updateJoin: (patch: any) => void;
  updateFooter: (patch: any) => void;
  resetToDefaults: () => void;
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
};

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          hero: { ...DEFAULT_STATE.hero, ...parsed.hero },
          media: {
            ...DEFAULT_STATE.media,
            ...parsed.media,
            pokemonCards: parsed.media?.pokemonCards || DEFAULT_STATE.media.pokemonCards,
          },
          manifesto: { ...DEFAULT_STATE.manifesto, ...parsed.manifesto },
          classes: { ...DEFAULT_STATE.classes, ...parsed.classes },
          instructors: { ...DEFAULT_STATE.instructors, ...parsed.instructors },
          membership: { ...DEFAULT_STATE.membership, ...parsed.membership },
          join: { ...DEFAULT_STATE.join, ...parsed.join },
          footer: { ...DEFAULT_STATE.footer, ...parsed.footer },
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_STATE;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      // ignore quota
    }
  }, [content]);

  const login = (u: string, p: string): boolean => {
    if (u.trim() === "foilandpull" && p.trim() === "001571") {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_KEY, "true");
      } catch {
        // ignore
      }
      setIsLoginOpen(false);
      setIsEditorOpen(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
    setIsEditorOpen(false);
  };

  const updateHero = (patch: Partial<ContentState["hero"]>) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...patch },
    }));
  };

  const updateMedia = (patch: Partial<ContentState["media"]>) => {
    setContent((prev) => ({
      ...prev,
      media: { ...prev.media, ...patch },
    }));
  };

  const updatePokemonCard = (index: number, patch: any) => {
    setContent((prev: any) => {
      const nextCards = [...prev.media.pokemonCards];
      if (nextCards[index]) {
        nextCards[index] = { ...nextCards[index], ...patch };
      }
      return {
        ...prev,
        media: { ...prev.media, pokemonCards: nextCards },
      };
    });
  };

  const updateManifesto = (patch: Partial<ContentState["manifesto"]>) => {
    setContent((prev) => ({
      ...prev,
      manifesto: { ...prev.manifesto, ...patch },
    }));
  };

  const updatePillar = (
    index: number,
    patch: Partial<ContentState["manifesto"]["pillars"][number]>
  ) => {
    setContent((prev) => {
      const nextPillars = [...prev.manifesto.pillars] as any[];
      if (nextPillars[index]) {
        nextPillars[index] = { ...nextPillars[index], ...patch };
      }
      return {
        ...prev,
        manifesto: { ...prev.manifesto, pillars: nextPillars } as unknown as typeof MANIFESTO,
      };
    });
  };

  const updateClasses = (patch: Partial<ContentState["classes"]>) => {
    setContent((prev) => ({
      ...prev,
      classes: { ...prev.classes, ...patch },
    }));
  };

  const updateClassItem = (
    index: number,
    patch: Partial<ContentState["classes"]["items"][number]>
  ) => {
    setContent((prev) => {
      const nextItems = [...prev.classes.items] as any[];
      if (nextItems[index]) {
        nextItems[index] = { ...nextItems[index], ...patch };
      }
      return {
        ...prev,
        classes: { ...prev.classes, items: nextItems } as unknown as typeof CLASSES,
      };
    });
  };

  const updateInstructors = (patch: Partial<ContentState["instructors"]>) => {
    setContent((prev) => ({
      ...prev,
      instructors: { ...prev.instructors, ...patch },
    }));
  };

  const updateInstructorItem = (
    index: number,
    patch: Partial<ContentState["instructors"]["items"][number]>
  ) => {
    setContent((prev) => {
      const nextItems = [...prev.instructors.items] as any[];
      if (nextItems[index]) {
        nextItems[index] = { ...nextItems[index], ...patch };
      }
      return {
        ...prev,
        instructors: { ...prev.instructors, items: nextItems } as unknown as typeof INSTRUCTORS,
      };
    });
  };

  const updateMembership = (patch: Partial<ContentState["membership"]>) => {
    setContent((prev) => ({
      ...prev,
      membership: { ...prev.membership, ...patch },
    }));
  };

  const updateMembershipPlan = (
    index: number,
    patch: Partial<ContentState["membership"]["items"][number]>
  ) => {
    setContent((prev) => {
      const nextPlans = [...prev.membership.items] as any[];
      if (nextPlans[index]) {
        nextPlans[index] = { ...nextPlans[index], ...patch };
      }
      return {
        ...prev,
        membership: { ...prev.membership, items: nextPlans } as unknown as typeof PLANS,
      };
    });
  };

  const updateJoin = (patch: Partial<ContentState["join"]>) => {
    setContent((prev) => ({
      ...prev,
      join: { ...prev.join, ...patch },
    }));
  };

  const updateFooter = (patch: Partial<ContentState["footer"]>) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, ...patch },
    }));
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setContent(DEFAULT_STATE);
  };

  return (
    <ContentContext.Provider
      value={{
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
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    return {
      content: DEFAULT_STATE,
      updateHero: () => {},
      updateMedia: () => {},
      updatePokemonCard: () => {},
      updateManifesto: () => {},
      updatePillar: () => {},
      updateClasses: () => {},
      updateClassItem: () => {},
      updateInstructors: () => {},
      updateInstructorItem: () => {},
      updateMembership: () => {},
      updateMembershipPlan: () => {},
      updateJoin: () => {},
      updateFooter: () => {},
      resetToDefaults: () => {},
      isAuthenticated: false,
      login: () => false,
      logout: () => {},
      isEditorOpen: false,
      setIsEditorOpen: () => {},
      isLoginOpen: false,
      setIsLoginOpen: () => {},
    };
  }
  return ctx;
}
