import {
  Baby,
  Briefcase,
  Cake,
  Calendar,
  CalendarCheck,
  CalendarDays,
  ChefHat,
  Clock,
  CookingPot,
  Gift,
  GlassWater,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Layers,
  Leaf,
  ListChecks,
  Mail,
  Martini,
  Microwave,
  PartyPopper,
  Refrigerator,
  ShoppingBasket,
  Snowflake,
  Soup,
  Sparkles,
  Sprout,
  Ticket,
  User,
  Users,
  UsersRound,
  UtensilsCrossed,
  WheatOff,
  Wine,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

// Registre unique des pictogrammes : les contenus (messages, données) ne référencent que des clés.

/** Les trois services du site. */
export const SERVICE_ICONS = { batch: CookingPot, chef: ChefHat, cours: GraduationCap } as const
export type ServiceIconName = keyof typeof SERVICE_ICONS

/** Pictogrammes des cartes de contenu (pages de service). */
export const CONTENT_ICONS = {
  // batch cooking
  checklist: ListChecks,
  chef: ChefHat,
  boxes: Layers,
  sparkles: Sparkles,
  fridge: Refrigerator,
  freezer: Snowflake,
  reheat: Microwave,
  once: Calendar,
  weekly: CalendarCheck,
  monthly: CalendarDays,
  gluten: WheatOff,
  veg: Sprout,
  kids: Baby,
  // chef privé et cours
  menu: UtensilsCrossed,
  tasting: Sparkles,
  buffet: Soup,
  cocktail: Martini,
  wine: Wine,
  list: ListChecks,
  sans: GlassWater,
  users: Users,
  tools: Wrench,
  home: Home,
  solo: User,
  couple: Heart,
  friends: UsersRound,
  team: Briefcase,
  party: PartyPopper,
  bases: ChefHat,
  season: Leaf,
  pastry: Cake,
  world: Globe,
  batch: Refrigerator,
  level: GraduationCap,
  clock: Clock,
  basket: ShoppingBasket,
  gift: Gift,
  ticket: Ticket,
  mail: Mail,
} satisfies Record<string, LucideIcon>

/** Résout une clé issue des messages ; `undefined` si inconnue (à gérer avec un repli). */
export function contentIcon(name: string): LucideIcon | undefined {
  return (CONTENT_ICONS as Record<string, LucideIcon>)[name]
}
