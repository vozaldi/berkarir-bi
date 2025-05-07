'use client';

import { useState } from "react";
import { ErrorState, ValueOf } from "../../types/utilities";
import ToastMessage from "@/components/basics/ToastMessage";

type Fields = {
  [key: string]: unknown;
};

export function useFields<F extends Fields>(inputFields: F) {
  // States
  const [fields, setFields] = useState<F>(inputFields);
  const [error, setError] = useState<ErrorState<F>>({
    fields: [],
    message: undefined,
  });

  // Vars
  const handleFieldChange = (field: keyof F, value: ValueOf<F>) => {
    setFields(state => ({
      ...state,
      [field]: value
    }));

    setError({
      fields: [],
      message: undefined,
    });
  };

  const handleErrorShow = (fields: keyof F | Array<keyof F>, message: string) => {
    setError({
      fields: 'string' === typeof fields ? [fields] : fields as Array<keyof F>,
      message
    });

    ToastMessage.toast(message, { type: 'error' });
  };

  const isFieldError = (field?: keyof F | Array<keyof F>) => {
    const { fields = [] } = error;
    const fieldCheck = Array.isArray(field) ? field : (!field ? [] : [field]);

    if (!field) {
      return !!error.message && !fields.length;
    }

    return fields.some((item) => fieldCheck.includes(item));
  };

  return {
    defaultFields: inputFields,
    fields: fields as Readonly<F>,
    setFields,
    error: error as Readonly<typeof error>,
    setError,
    clearError: () => setError({ fields: [], message: '' }),
    handleFieldChange,
    handleErrorShow,
    isFieldError,
    reset: () => {
      setFields(inputFields);
      setError({ fields: [], message: undefined });
    },
  };
};
