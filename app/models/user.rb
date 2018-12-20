class User < ApplicationRecord
  has_one :login_type
  has_many :likes
  has_many :friends
  has_many :followers
end
