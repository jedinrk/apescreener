import { GetEarlyAccessModal } from "./GetEarlyAccessModal";
import { JoinGalxeQuestModal } from "./JoinGalxeQuestModal";

export enum PopUpModalType {
  EARLY_ACCESS,
  GALXE_QUEST,
  NONE,
}

interface PopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModalType: PopUpModalType;
}

export const PopUpModal: React.FC<PopUpModalProps> = ({
  isOpen,
  onClose,
  activeModalType,
}) => {
  const render = () => {
    switch (activeModalType) {
      case PopUpModalType.EARLY_ACCESS:
        return <GetEarlyAccessModal isOpen={isOpen} onClose={onClose} />;
      case PopUpModalType.GALXE_QUEST:
        return <JoinGalxeQuestModal onClose={onClose}/>;
    }
  };
  return render();
};
