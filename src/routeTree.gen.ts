/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ContactRouteImport } from './routes/contact'
import { Route as ServicesRouteImport } from './routes/services'
import { Route as TeamRouteImport } from './routes/team'
import { Route as WorkRouteImport } from './routes/work'
const IndexRoute=IndexRouteImport.update({id:'/',path:'/',getParentRoute:()=>rootRouteImport} as any)
const ContactRoute=ContactRouteImport.update({id:'/contact',path:'/contact',getParentRoute:()=>rootRouteImport} as any)
const ServicesRoute=ServicesRouteImport.update({id:'/services',path:'/services',getParentRoute:()=>rootRouteImport} as any)
const TeamRoute=TeamRouteImport.update({id:'/team',path:'/team',getParentRoute:()=>rootRouteImport} as any)
const WorkRoute=WorkRouteImport.update({id:'/work',path:'/work',getParentRoute:()=>rootRouteImport} as any)
export interface FileRoutesByFullPath{'/':typeof IndexRoute;'/contact':typeof ContactRoute;'/services':typeof ServicesRoute;'/team':typeof TeamRoute;'/work':typeof WorkRoute}
export interface FileRoutesByTo{'/':typeof IndexRoute;'/contact':typeof ContactRoute;'/services':typeof ServicesRoute;'/team':typeof TeamRoute;'/work':typeof WorkRoute}
export interface FileRoutesById{__root__:typeof rootRouteImport;'/':typeof IndexRoute;'/contact':typeof ContactRoute;'/services':typeof ServicesRoute;'/team':typeof TeamRoute;'/work':typeof WorkRoute}
export interface FileRouteTypes{fileRoutesByFullPath:FileRoutesByFullPath;fullPaths:'/'|'/contact'|'/services'|'/team'|'/work';fileRoutesByTo:FileRoutesByTo;to:'/'|'/contact'|'/services'|'/team'|'/work';id:'__root__'|'/'|'/contact'|'/services'|'/team'|'/work';fileRoutesById:FileRoutesById}
export interface RootRouteChildren{IndexRoute:typeof IndexRoute;ContactRoute:typeof ContactRoute;ServicesRoute:typeof ServicesRoute;TeamRoute:typeof TeamRoute;WorkRoute:typeof WorkRoute}
const rootRouteChildren:RootRouteChildren={IndexRoute,ContactRoute,ServicesRoute,TeamRoute,WorkRoute}
export const routeTree=rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start'{interface Register{ssr:true;router:Awaited<ReturnType<typeof getRouter>>;config:Awaited<ReturnType<typeof startInstance.getOptions>>}}
