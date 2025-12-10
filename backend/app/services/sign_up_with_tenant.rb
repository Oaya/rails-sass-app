class SignUpWithTenant
  attr_reader :user, :tenant, :error_message

  def initialize(user_params, tenant_params)
    @user_params = user_params
    @tenant_params = tenant_params
  end

  def call
    ActiveRecord::Base.transaction do
          # Save the user. we need to save user with tenant and plan.
          # FInd the Plan with name first
          plan = Plan.find_by(name: @tenant_params[:plan])
          puts plan

          unless plan
            raise ActiveRecord::RecordInvalid.new(Plan.new), "Invalid plan"
          end

            @tenant = Tenant.create!(name: @tenant_params[:tenant], plan_id: plan.id)
            @user = User.new(@user_params)
            @user.tenant = @tenant
            @user.save!
          end
          true
  rescue ActiveRecord::RecordInvalid => e
    @error_message = e.record.errors.full_messages.join(", ")
    false
  end
end
