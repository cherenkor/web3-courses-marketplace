import { Modal } from "@components/common/modal/modal";
import { UiButton } from "@components/common/ui-button/ui-button";
import { ICourse } from "data/courses/fetcher";
import { useEthPrice } from "hooks/use-eth-price";
import { useEffect, useState } from "react";
import { createFormState } from "./create-form-state";
import { initialOrder, IOrder } from "./initial-order";
interface IProps {
  course: ICourse;
  onSubmit(order: IOrder): void;
  onClose(): void;
}

export const OrderModal = ({ course, onSubmit, onClose }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [enableAdjustPrice, setEnableAdjustPrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);
  const [order, setOrder] = useState(initialOrder);
  const { eth } = useEthPrice();
  const formState = createFormState({ ...order, hasAgreedTOS });

  const closeModal = () => {
    onClose();
    setIsOpen(false);
    setHasAgreedTOS(false);
    setEnableAdjustPrice(false);
    setOrder(initialOrder);
  };

  useEffect(() => {
    if (!!course) {
      setIsOpen(true);
      setOrder((prev) => ({
        ...prev,
        price: eth.perItem,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900"
                id="modal-title"
              >
                {course.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enableAdjustPrice}
                        onChange={({ target: { checked } }) => {
                          if (!checked) {
                            setOrder((prev) => ({
                              ...prev,
                              price: eth.perItem,
                            }));
                          }

                          setEnableAdjustPrice(checked);
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>
                      Adjust Price - only when the price is not correct
                    </span>
                  </div>
                </div>
                <input
                  disabled={!enableAdjustPrice}
                  value={order.price}
                  onChange={({ target: { value } }) => {
                    if (isNaN(value as unknown as number)) return;

                    setOrder((prev) => ({
                      ...prev,
                      price: value,
                    }));
                  }}
                  type="text"
                  name="price"
                  id="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price
                  will be lower, order can be declined (+- 2% slipage is
                  allowed)
                </p>
              </div>
              <div className="mt-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Email</label>
                </div>
                <input
                  value={order.email}
                  onChange={({ target: { value = "" } }) => {
                    setOrder((prev) => ({
                      ...prev,
                      email: value.trim(),
                    }));
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
                <p className="text-xs text-gray-700 mt-1">
                  It&apos;s important to fill a correct email, otherwise the
                  order cannot be verified. We are not storing your email
                  anywhere
                </p>
              </div>
              <div className="my-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Repeat Email</label>
                </div>
                <input
                  value={order.confirmationEmail}
                  onChange={({ target: { value = "" } }) => {
                    setOrder((prev) => ({
                      ...prev,
                      confirmationEmail: value.trim(),
                    }));
                  }}
                  type="email"
                  name="confirmationEmail"
                  id="confirmationEmail"
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
              </div>
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                    checked={hasAgreedTOS}
                    onChange={({ target: { checked } }) => {
                      setHasAgreedTOS(checked);
                    }}
                    type="checkbox"
                    className="form-checkbox"
                  />
                </label>
                <span>
                  I accept Eincode &apos;terms of service&apos; and I agree that
                  my order can be rejected in the case data provided above are
                  not correct
                </span>
              </div>

              {formState.message && (
                <div className="fadeIn p-4 mt-4 text-orange-700 bg-orange-200 rounded-lg text-sm">
                  {formState.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <UiButton
            disabled={formState.isDisabled}
            onClick={() => {
              onSubmit(order);
            }}
            className="mr-4"
          >
            Submit
          </UiButton>
          <UiButton variant="danger" onClick={closeModal}>
            Cancel
          </UiButton>
        </div>
      </div>
    </Modal>
  );
};
