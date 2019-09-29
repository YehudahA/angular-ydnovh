import { Stop } from "./stop";
import { LangTranslation } from "./lang-trans";

export interface RouteStop extends Stop{
  stopSequence: number;
  translations: LangTranslation[];
}
