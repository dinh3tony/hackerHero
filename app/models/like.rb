class Like < ApplicationRecord
  belongs_to :liked, :class_name => 'User', :foreign_key => 'user_id'
  belongs_to :liked_by, :class_name => 'User', :foreign_key => 'liked_id';
end
