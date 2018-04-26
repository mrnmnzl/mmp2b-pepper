class Pepper < ApplicationRecord
  belongs_to :user
end

class Progress < Pepper
end

class Trend < Pepper
end

class ToDo < Pepper
  has_many :tasks
end

class Mean < Pepper
end

class Negative < Pepper
end

class Piece < Pepper
end
