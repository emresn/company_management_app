import { SiteConstants } from "./siteConstants";

export const ProductListAPIUrl = `${SiteConstants.backendBaseUrl}/products/api${SiteConstants.backendSuffix}`
export const AuthenticationUrl = `${SiteConstants.backendBaseUrl}/api-token-auth/`
export const SingleProductAPIUrl = (id:string) => `${SiteConstants.backendBaseUrl}/products/api/${id}/${SiteConstants.backendSuffix}`
export const ImageAPIUrl = `${SiteConstants.backendBaseUrl}/products/api/image/${SiteConstants.backendSuffix}`
