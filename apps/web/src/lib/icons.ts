import {
  SiAnthropic, SiApple, SiBun, SiChakraui, SiClockify,
  SiExpress, SiFastapi, SiGit, SiGithub, SiHackerrank, SiJavascript,
  SiJira, SiMongodb, SiMui, SiMysql, SiNextdotjs,
  SiNodedotjs, SiNotion, SiNuxt, SiOpenai,
  SiPostman, SiRadixui, SiReact, SiReactquery, SiRedux, SiSlack,
  SiSocketdotio, SiTailwindcss, SiTypescript, SiVercel, SiVitest,
  SiVuedotjs,
} from 'react-icons/si';
import { FaAws, FaLinkedinIn } from 'react-icons/fa6';
import type { ElementType } from 'react';

export const siIconMap: Record<string, ElementType> = {
  SiAnthropic, SiApple, SiBun, SiChakraui, SiClockify,
  SiExpress, SiFastapi, SiGit, SiGithub, SiHackerrank, SiJavascript,
  SiJira, SiMongodb, SiMui, SiMysql, SiNextdotjs,
  SiNodedotjs, SiNotion, SiNuxt, SiOpenai,
  SiPostman, SiRadixui, SiReact, SiReactquery, SiRedux, SiSlack,
  SiSocketdotio, SiTailwindcss, SiTypescript, SiVercel, SiVitest,
  SiVuedotjs,
  // fa6 fallbacks for icons removed from react-icons/si
  FaAws, FaLinkedinIn,
};
