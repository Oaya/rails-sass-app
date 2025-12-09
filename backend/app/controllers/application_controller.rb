class ApplicationController < ActionController::API
  before_action :set_current_user_and_account

  private

  def set_current_user_and_account
    Current.user = current_user
    Current.account = current_user&.account
  end
end
