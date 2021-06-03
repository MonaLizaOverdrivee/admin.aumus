import usestate from "./state";
import { cloneDeep } from "@/use/useCompare";
// import { useConfirm } from "primevue/useconfirm";

const state = usestate();
// const confirm = useConfirm();

function open({ display, currentEditableUser, startStateEditableUser }) {
  return function (payload) {
    if (payload) {
      currentEditableUser.value = cloneDeep(payload);
      startStateEditableUser.value = cloneDeep(payload);
    }
    display.value = true;
    console.log(display.value)
  };
}

function close({ checkChange, display }) {
  return function () {
    if (!checkChange.value) {
      confirm.require({
        message: "Есть не сохраненные данные, всё ровно выйти?",
        header: "Подтвердите действие",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Да",
        rejectLabel: "Нет",
        accept: () => {
          display.value = false;
        },
      });
    } else {
      display.value = false;
    }
  };
}

export default {
  open: open(state),
  close: close(state),
};
