variable "profile" {
  type = string
  default = "jds"
}

variable "region" {
  type = string
  default = "us-west-1"
}

variable "project" {
  type = string
  default = "chadedwardsband"
}

variable "domain" {
  type = string
  default = "chadedwardsband.com"
}

variable "zone_id" {
  type = string
  default = "Z07230841WGGQO6S2Y4IA"
}

variable "certificate_arn" {
  type = string 
  default = "arn:aws:acm:us-east-1:671958020402:certificate/d3d8cc33-8a32-49c4-8e5b-d35e1754d9bd"
}

variable "image_bucket_name" {
  type = string
  default = "chadedwardspublicimages"
}