class CreateAdmins < ActiveRecord::Migration[6.1]
  def change
    create_table :admin do |t|
      t.string :email, null: false, unique: true
    end
  end
end
