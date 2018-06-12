class Pepper < ApplicationRecord
  belongs_to :user #dependants destroy
  has_many :tasks
  def self.types_and_labels
    [['Progress', "Progress"],['Mean value', "Mean"], ['Tasks', "ToDo"]]
  end

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
