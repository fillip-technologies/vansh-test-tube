import {
  CalendarHeart,
  CircleDot,
  ClipboardList,
  Droplet,
  FlaskConical,
  Heart,
  HeartHandshake,
  Layers,
  MessageCircle,
  Route,
  Snowflake,
  Sprout,
  Stethoscope,
  Syringe,
  UserCheck,
} from './icons.jsx'

// Icon names usable in services.json (e.g. "icon": "flask").
export const ICONS = {
  calendar: CalendarHeart,
  'circle-dot': CircleDot,
  clipboard: ClipboardList,
  droplet: Droplet,
  flask: FlaskConical,
  heart: Heart,
  'heart-handshake': HeartHandshake,
  layers: Layers,
  message: MessageCircle,
  route: Route,
  snowflake: Snowflake,
  sprout: Sprout,
  stethoscope: Stethoscope,
  syringe: Syringe,
  'user-check': UserCheck,
}

export function getIcon(name) {
  return ICONS[name] ?? Heart
}
