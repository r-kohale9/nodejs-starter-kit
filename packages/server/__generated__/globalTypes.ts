/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddCategoryInput {
  modalName?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  isNavbar?: boolean | null;
  parentCategoryId?: number | null;
  isActive?: boolean | null;
}

export interface AddCommentInput {
  content: string;
  postId: number;
}

export interface AddDiscountDurationInput {
  startDate?: string | null;
  endDate?: string | null;
}

export interface AddDiscountInput {
  modalId?: number | null;
  discountPercent?: number | null;
  modalName?: string | null;
  isActive?: boolean | null;
  discountDuration?: AddDiscountDurationInput | null;
}

export interface AddDynamicCarouselInput {
  id?: number | null;
  title?: string | null;
  description?: string | null;
  label?: string | null;
  link?: string | null;
  imageUrl: string;
  isActive?: boolean | null;
}

export interface AddListingInput {
  userId?: number | null;
  categoryId?: number | null;
  title?: string | null;
  description?: string | null;
  sku?: string | null;
  brand?: string | null;
  listingFlags?: ListingFlagInput | null;
  listingOptions?: ListingOptionInput | null;
  listingDetail?: ListingDetailInput | null;
  listingMedia?: (ListingMediumInput | null)[] | null;
  listingHighlight?: (ListingHighlightInput | null)[] | null;
  listingCostArray?: (ListingCostInput | null)[] | null;
  isActive?: boolean | null;
}

export interface AddMessageInput {
  text?: string | null;
  userId?: number | null;
  uuid?: string | null;
  quotedId?: number | null;
  attachment?: any | null;
}

export interface AddMobileInput {
  id?: number | null;
  mobile: string;
  otp?: number | null;
}

export interface AddModalReviewInput {
  modalName?: string | null;
  modalId?: number | null;
  review?: AddReviewInput | null;
}

export interface AddPostInput {
  title: string;
  content: string;
}

export interface AddReviewInput {
  id?: number | null;
  userId?: number | null;
  rating?: string | null;
  feedback?: string | null;
  isActive?: boolean | null;
  reviewMedia?: (ReviewMediumInput | null)[] | null;
}

export interface AddToCartInput {
  consumerId?: number | null;
  orderDetail: OrderDetailInput;
}

export interface AddUserInput {
  username: string;
  email: string;
  password: string;
  role: string;
  isActive?: boolean | null;
  profile?: ProfileInput | null;
  auth?: AuthInput | null;
}

export interface AddressInput {
  id?: number | null;
  userId?: number | null;
  streetAddress1?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  pinCode?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  mobile?: string | null;
  isDefault?: boolean | null;
}

export interface AuthCertificateInput {
  serial?: string | null;
}

export interface AuthFacebookInput {
  fbId?: string | null;
  displayName?: string | null;
}

export interface AuthGitHubInput {
  ghId?: string | null;
  displayName?: string | null;
}

export interface AuthGoogleInput {
  googleId?: string | null;
  displayName?: string | null;
}

export interface AuthInput {
  certificate?: AuthCertificateInput | null;
  facebook?: AuthFacebookInput | null;
  google?: AuthGoogleInput | null;
  github?: AuthGitHubInput | null;
  linkedin?: AuthLinkedInInput | null;
}

export interface AuthLinkedInInput {
  lnId?: string | null;
  displayName?: string | null;
}

export interface CategoryFilter {
  categoryId?: number | null;
  allSubCategory?: boolean | null;
}

export interface ContactInput {
  name: string;
  email: string;
  content: string;
}

export interface DeleteCommentInput {
  id: number;
  postId: number;
}

export interface EditCategoryInput {
  modalName?: string | null;
  id?: number | null;
  title?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  isNavbar?: boolean | null;
  parentCategoryId?: number | null;
  isActive?: boolean | null;
}

export interface EditCommentInput {
  id: number;
  content: string;
  postId: number;
}

export interface EditDiscountDurationInput {
  id?: number | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface EditDiscountInput {
  id?: number | null;
  modalId?: number | null;
  discountPercent?: number | null;
  modalName?: string | null;
  isActive?: boolean | null;
  discountDuration?: EditDiscountDurationInput | null;
}

export interface EditDynamicCarouselInput {
  id: number;
  title?: string | null;
  description?: string | null;
  label?: string | null;
  link?: string | null;
  imageUrl?: string | null;
  isActive?: boolean | null;
}

export interface EditListingInput {
  id: number;
  userId?: number | null;
  categoryId?: number | null;
  title?: string | null;
  description?: string | null;
  sku?: string | null;
  brand?: string | null;
  listingFlags?: ListingFlagInput | null;
  listingOptions?: ListingOptionInput | null;
  listingDetail?: ListingDetailInput | null;
  listingMedia?: (ListingMediumInput | null)[] | null;
  listingHighlight?: (ListingHighlightInput | null)[] | null;
  listingCostArray?: (ListingCostInput | null)[] | null;
  isActive?: boolean | null;
}

export interface EditMessageInput {
  id: number;
  text?: string | null;
  userId?: number | null;
}

export interface EditOrderDetailInput {
  id?: number | null;
  listingCost?: number | null;
  orderOptions?: OrderOptionsInput | null;
}

export interface EditPlatformInput {
  id: number;
  name?: string | null;
  logo?: string | null;
  type?: string | null;
  isActive?: boolean | null;
  platformInfo?: PlatformInfoInput | null;
  platformSocial?: PlatformSocialInput | null;
}

export interface EditPostInput {
  id: number;
  title: string;
  content: string;
}

export interface EditReviewInput {
  id: number;
  userId?: number | null;
  rating?: string | null;
  feedback?: string | null;
  isActive?: boolean | null;
  helpful?: number | null;
  reviewMedia?: (ReviewMediumInput | null)[] | null;
}

export interface EditUserInput {
  id: number;
  username: string;
  role: string;
  isActive?: boolean | null;
  email: string;
  password?: string | null;
  profile?: ProfileInput | null;
  auth?: AuthInput | null;
}

export interface FilterCategoryInput {
  searchText?: string | null;
  modalName?: string | null;
  isNavbar?: boolean | null;
  isActive?: boolean | null;
}

export interface FilterDiscountInput {
  searchText?: string | null;
  modalName?: string | null;
  isActive?: boolean | null;
  isDiscount?: boolean | null;
  onGoing?: boolean | null;
  upComing?: boolean | null;
}

export interface FilterDynamicCarouselInput {
  searchText?: string | null;
  label?: string | null;
  isActive?: boolean | null;
}

export interface FilterListInput {
  userId?: number | null;
  searchText?: string | null;
  brand?: (string | null)[] | null;
  categoryFilter?: CategoryFilter | null;
  lowerCost?: number | null;
  upperCost?: number | null;
  discount?: number | null;
  popularity?: number | null;
  showOwned?: boolean | null;
  isFeatured?: boolean | null;
  isNew?: boolean | null;
  isDiscount?: boolean | null;
  isActive?: boolean | null;
}

export interface FilterOrderInput {
  searchText?: string | null;
  vendorId?: number | null;
  consumerId?: number | null;
  state?: string | null;
}

export interface FilterReviewInput {
  searchText?: string | null;
  isActive?: boolean | null;
  modalName?: string | null;
  modalId?: number | null;
  userId?: number | null;
}

export interface FilterUserInput {
  searchText?: string | null;
  role?: string | null;
  isActive?: boolean | null;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ListingCostInput {
  id?: number | null;
  cost?: number | null;
  discount?: number | null;
  type?: string | null;
  label?: string | null;
  isActive?: boolean | null;
}

export interface ListingDetailInput {
  id?: number | null;
  inventoryCount?: number | null;
  isActive?: boolean | null;
}

export interface ListingFlagInput {
  id?: number | null;
  isFeatured?: boolean | null;
  isNew?: boolean | null;
  isDiscount?: boolean | null;
  isActive?: boolean | null;
}

export interface ListingHighlightInput {
  id?: number | null;
  highlight: string;
}

export interface ListingMediumInput {
  id?: number | null;
  url: string;
  type?: string | null;
  isActive?: boolean | null;
}

export interface ListingOptionInput {
  id?: number | null;
  fixedQuantity?: number | null;
  isActive?: boolean | null;
}

export interface LoginUserInput {
  usernameOrEmail: string;
  password: string;
}

export interface OrderByCategoryInput {
  column?: string | null;
  order?: string | null;
}

export interface OrderByDiscountInput {
  column?: string | null;
  order?: string | null;
}

export interface OrderByDynamicCarouselInput {
  column?: string | null;
  order?: string | null;
}

export interface OrderByListInput {
  column?: string | null;
  order?: string | null;
}

export interface OrderByReviewInput {
  column?: string | null;
  order?: string | null;
}

export interface OrderByUserInput {
  column?: string | null;
  order?: string | null;
}

export interface OrderDetailInput {
  id?: number | null;
  vendorId?: number | null;
  modalName?: string | null;
  modalId?: number | null;
  title?: string | null;
  imageUrl?: string | null;
  cost?: number | null;
  orderOptions?: OrderOptionsInput | null;
}

export interface OrderOptionsInput {
  id?: number | null;
  quantity?: number | null;
}

export interface PlatformInfoInput {
  id: number;
  mobile?: string | null;
  email?: string | null;
  address?: string | null;
  isActive?: boolean | null;
}

export interface PlatformSocialInput {
  id: number;
  youtube?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedIn?: string | null;
  twitter?: string | null;
}

export interface ProfileInput {
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  passwordConfirmation: string;
}

export interface ReviewMediumInput {
  id?: number | null;
  url: string;
  type?: string | null;
  isActive?: boolean | null;
}

export interface ShareListingByEmailInput {
  email: string;
  message: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
