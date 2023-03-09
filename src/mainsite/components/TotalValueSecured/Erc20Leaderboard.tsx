import type { FC, ReactEventHandler } from "react";
import { useCallback } from "react";
import { useTotalValueSecured } from "../../api/total-value-secured";
import scrollbarStyles from "../../styles/Scrollbar.module.scss";
import { AmountBillionsUsdAnimated } from "../Amount";
import BodyText from "../../../components/TextsNext/BodyText";
import {
  WidgetBackground,
  WidgetTitle,
} from "../../../components/WidgetSubcomponents";

const Erc20Leaderboard: FC = () => {
  const totalValueSecured = useTotalValueSecured();
  const onImageError = useCallback<ReactEventHandler<HTMLImageElement>>((e) => {
    (e.target as HTMLImageElement).src =
      "/leaderboard-images/question-mark-v2.svg";
  }, []);
  return (
    <WidgetBackground className="flex flex-col gap-y-4">
      <WidgetTitle>erc20 leaderboard</WidgetTitle>
      <ul
        className={`
          max-h-96 overflow-y-auto
          pr-2
          ${scrollbarStyles["styled-scrollbar-vertical"]}
          ${scrollbarStyles["styled-scrollbar"]}
        `}
      >
        {totalValueSecured !== undefined &&
          totalValueSecured.erc20Leaderboard.map((row) => (
            <li
              className="flex items-center justify-between text-white"
              key={row.name}
            >
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    row.imageUrl ?? "/leaderboard-images/question-mark-v2.svg"
                  }
                  alt="logo of an ERC20 token"
                  onError={onImageError}
                />
                <BodyText className="ml-2 truncate">{row.name}</BodyText>
              </div>
              <AmountBillionsUsdAnimated>
                {row.marketCap}
              </AmountBillionsUsdAnimated>
            </li>
          ))}
      </ul>
    </WidgetBackground>
  );
};

export default Erc20Leaderboard;
