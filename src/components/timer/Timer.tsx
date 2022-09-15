import React from "react";
import { Button, Card, Icon, Statistic } from "semantic-ui-react";
import { useTimer } from "../../hooks/useTimer";
import "./Timer.css";

type Props = {
  timeLeft: number;
  isPrime: boolean;
  reset: () => void;
};

type ContainerProps = { limit: number };

const Component = ({
  timeLeft = 0,
  isPrime = false,
  reset = () => undefined,
}: Props) => (
  <Card>
    <Statistic className="number-board">
      <Statistic.Label>time</Statistic.Label>
      <Statistic.Value
        className={isPrime ? "prime-number" : undefined}
        data-testid="time-left"
      >
        {timeLeft}
      </Statistic.Value>
    </Statistic>
    <Card.Content>
      <Button color="red" fluid onClick={reset}>
        <Icon name="redo" />
        Reset
      </Button>
    </Card.Content>
  </Card>
);

const Container = ({ limit }: ContainerProps) => {
  const { timeLeft, isPrime, reset } = useTimer(limit);

  return <Component timeLeft={timeLeft} isPrime={isPrime} reset={reset} />;
};

export default Container;
