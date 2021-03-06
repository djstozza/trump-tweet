# Allow dates filters to accept empty strings as nil
# https://github.com/orgsync/active_interaction/issues/412
module ConvertBlankToNil
  def convert(value, context)
    if value.blank? && value != false
      nil
    else
      super
    end
  end
end
module ConvertBlankToNilCast
  def cast(value, _interaction)
    if value.blank? && value != false
      nil
    else
      super
    end
  end
end

ActiveInteraction::IntegerFilter.prepend(ConvertBlankToNil)
ActiveInteraction::FloatFilter.prepend(ConvertBlankToNil)
ActiveInteraction::DecimalFilter.prepend(ConvertBlankToNilCast)
ActiveInteraction::BooleanFilter.prepend(ConvertBlankToNilCast)
