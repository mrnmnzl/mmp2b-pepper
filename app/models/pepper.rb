class Pepper < ApplicationRecord
  belongs_to :user
  has_many :tasks


end

class Progress < Pepper
end

class Trend < Pepper
end

class ToDo < Pepper

end

class Mean < Pepper
end

class Negative < Pepper
end

class Piece < Pepper
end
