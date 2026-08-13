# EmailVerification SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

EmailVerificationUtility.registrar = ->(u) {
  u.clean = EmailVerificationUtilities::Clean
  u.done = EmailVerificationUtilities::Done
  u.make_error = EmailVerificationUtilities::MakeError
  u.feature_add = EmailVerificationUtilities::FeatureAdd
  u.feature_hook = EmailVerificationUtilities::FeatureHook
  u.feature_init = EmailVerificationUtilities::FeatureInit
  u.fetcher = EmailVerificationUtilities::Fetcher
  u.make_fetch_def = EmailVerificationUtilities::MakeFetchDef
  u.make_context = EmailVerificationUtilities::MakeContext
  u.make_options = EmailVerificationUtilities::MakeOptions
  u.make_request = EmailVerificationUtilities::MakeRequest
  u.make_response = EmailVerificationUtilities::MakeResponse
  u.make_result = EmailVerificationUtilities::MakeResult
  u.make_point = EmailVerificationUtilities::MakePoint
  u.make_spec = EmailVerificationUtilities::MakeSpec
  u.make_url = EmailVerificationUtilities::MakeUrl
  u.param = EmailVerificationUtilities::Param
  u.prepare_auth = EmailVerificationUtilities::PrepareAuth
  u.prepare_body = EmailVerificationUtilities::PrepareBody
  u.prepare_headers = EmailVerificationUtilities::PrepareHeaders
  u.prepare_method = EmailVerificationUtilities::PrepareMethod
  u.prepare_params = EmailVerificationUtilities::PrepareParams
  u.prepare_path = EmailVerificationUtilities::PreparePath
  u.prepare_query = EmailVerificationUtilities::PrepareQuery
  u.graphql_body = EmailVerificationUtilities::GraphqlBody
  u.graphql_errors = EmailVerificationUtilities::GraphqlErrors
  u.result_basic = EmailVerificationUtilities::ResultBasic
  u.result_body = EmailVerificationUtilities::ResultBody
  u.result_headers = EmailVerificationUtilities::ResultHeaders
  u.transform_request = EmailVerificationUtilities::TransformRequest
  u.transform_response = EmailVerificationUtilities::TransformResponse
}
