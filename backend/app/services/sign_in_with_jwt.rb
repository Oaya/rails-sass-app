class SignInWithJwt
  def initialize(controller)
    @controller = controller
  end


  def issue_jwt(user, scope: nil, message: nil)
    scope ||= @controller.send(:resource_name) rescue :user

    # sign in through Devise/Warden
    @controller.sign_in(scope, user)

    # Prefer devide-jwt token from env if present
    jwt = @controller.request.env["warden-jwt_auth.token"]

    # Fallback: manually encode (more reliable)
    if jwt.blank?
      jwt, = Warden::JWTAuth::UserEncoder.new.call(user, scope, nil)
    end

    raise "Could not generate authentication token" if jwt.blank?

    { 
      message: message,
      token: jwt,
      user: serialize_user(user)
    }
  end

  private

  def serialize_user(user)
    {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_admin: user.is_admin,
      tenant_id: user.tenant&.id,
      plan: user.tenant&.plan&.name
    }
  end
end
