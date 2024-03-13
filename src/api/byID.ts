import { adminService } from './admin';
import {
  UpdateProductNameRequest,
  UpdateProductNameResponse,
  UpdateProductSKURequest,
  UpdateProductSKUResponse,
  UpdateProductPreorderRequest,
  UpdateProductPreorderResponse,
  UpdateProductColorAndColorHexRequest,
  UpdateProductColorAndColorHexResponse,
  UpdateProductCountryOfOriginRequest,
  UpdateProductCountryOfOriginResponse,
  UpdateProductBrandRequest,
  UpdateProductBrandResponse,
  UpdateProductTargetGenderRequest,
  UpdateProductTargetGenderResponse,
  UpdateProductThumbnailRequest,
  UpdateProductThumbnailResponse,
  UpdateProductPriceRequest,
  UpdateProductPriceResponse,
  UpdateProductSaleRequest,
  UpdateProductSaleResponse,
  UpdateProductCategoryRequest,
  UpdateProductCategoryResponse,
  UpdateProductSizeStockRequest,
  UpdateProductSizeStockResponse,
  AddProductMeasurementRequest,
  AddProductMeasurementResponse,
  UpdateProductDescriptionRequest,
  UpdateProductDescriptionResponse,
  AddProductTagRequest,
  AddProductTagResponse,
  DeleteProductTagRequest,
  DeleteProductTagResponse,
  HideProductByIDRequest,
  HideProductByIDResponse,
} from './proto-http/admin';

export function updateName(request: UpdateProductNameRequest): Promise<UpdateProductNameResponse> {
  return adminService.UpdateProductName(request);
}

export function updateSku(request: UpdateProductSKURequest): Promise<UpdateProductSKUResponse> {
  return adminService.UpdateProductSKU(request);
}

export function updatePreorder(
  request: UpdateProductPreorderRequest,
): Promise<UpdateProductPreorderResponse> {
  return adminService.UpdateProductPreorder(request);
}

export function updateColors(
  request: UpdateProductColorAndColorHexRequest,
): Promise<UpdateProductColorAndColorHexResponse> {
  return adminService.UpdateProductColorAndColorHex(request);
}

export function updateCountry(
  request: UpdateProductCountryOfOriginRequest,
): Promise<UpdateProductCountryOfOriginResponse> {
  return adminService.UpdateProductCountryOfOrigin(request);
}

export function updateBrand(
  request: UpdateProductBrandRequest,
): Promise<UpdateProductBrandResponse> {
  return adminService.UpdateProductBrand(request);
}

export function updateGender(
  request: UpdateProductTargetGenderRequest,
): Promise<UpdateProductTargetGenderResponse> {
  return adminService.UpdateProductTargetGender(request);
}

export function updateThumbnail(
  request: UpdateProductThumbnailRequest,
): Promise<UpdateProductThumbnailResponse> {
  return adminService.UpdateProductThumbnail(request);
}

export function updatePrice(
  request: UpdateProductPriceRequest,
): Promise<UpdateProductPriceResponse> {
  return adminService.UpdateProductPrice(request);
}

export function updateSale(request: UpdateProductSaleRequest): Promise<UpdateProductSaleResponse> {
  return adminService.UpdateProductSale(request);
}

export function updateCategory(
  request: UpdateProductCategoryRequest,
): Promise<UpdateProductCategoryResponse> {
  return adminService.UpdateProductCategory(request);
}

export function updateSize(
  request: UpdateProductSizeStockRequest,
): Promise<UpdateProductSizeStockResponse> {
  return adminService.UpdateProductSizeStock(request);
}

export function updateMeasurement(
  request: AddProductMeasurementRequest,
): Promise<AddProductMeasurementResponse> {
  return adminService.AddProductMeasurement(request);
}

export function updateDescription(
  request: UpdateProductDescriptionRequest,
): Promise<UpdateProductDescriptionResponse> {
  return adminService.UpdateProductDescription(request);
}

export function updateTag(request: AddProductTagRequest): Promise<AddProductTagResponse> {
  return adminService.AddProductTag(request);
}

export function deleteTag(request: DeleteProductTagRequest): Promise<DeleteProductTagResponse> {
  return adminService.DeleteProductTag(request);
}

export function updateHide(request: HideProductByIDRequest): Promise<HideProductByIDResponse> {
  return adminService.HideProductByID(request);
}