export interface ValidationErrorDetail {
  field: string
  message: string
}

export interface ApiErrorResponse {
  message?: string
  messsage?: string 
  errors?: ValidationErrorDetail[]
}