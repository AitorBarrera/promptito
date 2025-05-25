import { useState } from "react";
import type { CreatePrompt, Filters, Parametro } from "~/interfaces";

export const useForm = <T extends Filters | CreatePrompt | Parametro>(
  initialForm: T,
) => {
  const [filterState, setFilterState] = useState(initialForm);

  const onInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name } = event.target;
    let value: string | boolean = event.target.value;

    if (
      event.target.type === "checkbox" &&
      event.target instanceof HTMLInputElement
    ) {
      value = event.target.checked;
    }

    setFilterState({
      ...filterState,
      [name]: value,
    });
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const select = event.target;

    const name = select.name;
    const value = select.options[select.selectedIndex].value;

    setFilterState({
      ...filterState,
      [name]: value,
    });
  };

  const onCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const checkboxes = document.querySelectorAll(`.${name}Container input`);
    let finalValues: number[] = [];
    Array.from(checkboxes).forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked)
        finalValues.push(Number((checkbox as HTMLInputElement).value));
    });

    setFilterState({
      ...filterState,
      [name]: finalValues,
    });
  };

  const changeParameters = (parameterList: Parametro[]) => {
    setFilterState({
      ...filterState,
      parametros: parameterList,
    });
  };

  const onResetFilter = () => {
    setFilterState(initialForm);
  };

  return {
    ...filterState,
    filterState: filterState,
    setFilterState,
    onInputChange,
    onSelectChange,
    onCheckboxChange,
    onResetFilter,
    changeParameters,
  };
};
