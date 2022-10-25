export enum InputVariant {
  Default = 'default',
  Error = 'error',
  Disabled = 'disabled',
  ReadOnlyInfo = 'readonly-info',
  ReadOnlyConfirm = 'readonly-confirm',
}

export enum ReadOnlyVariant {
  ReadOnlyInfo = 'readonly-info',
  ReadOnlyConfirm = 'readonly-confirm',
}

export enum IconVariant {
  None = 'none',
  Error = 'error',
}

interface GetVariantProps {
  readOnly?: boolean | ReadOnlyVariant;
  disabled?: boolean;
  isValid?: boolean;
}

export const getVariant = ({
  readOnly = false,
  disabled = false,
  isValid = true,
}: GetVariantProps = {}) => {
  if (disabled) {
    return {
      variant: InputVariant.Disabled,
      iconVariant: IconVariant.None,
    };
  } else if (readOnly === true || readOnly === ReadOnlyVariant.ReadOnlyInfo) {
    return {
      variant: InputVariant.ReadOnlyInfo,
      iconVariant: IconVariant.None,
    };
  } else if (readOnly === ReadOnlyVariant.ReadOnlyConfirm) {
    return {
      variant: InputVariant.ReadOnlyConfirm,
      iconVariant: IconVariant.None,
    };
  } else if (isValid === false) {
    return {
      variant: InputVariant.Error,
      iconVariant: IconVariant.Error,
    };
  }
  return {
    variant: InputVariant.Default,
    iconVariant: IconVariant.None,
  };
};
