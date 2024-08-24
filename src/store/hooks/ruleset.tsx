import { BaseElement, BattleCondition, Ruleset } from "src/battler/types";
import { rulesetSlice } from "../ruleset";
import { useAppSelector, useAppDispatch } from "../store";
import { useCallback } from "react";

export const useRuleset = () => useAppSelector((store) => store.ruleset);

export const useSetRuleset = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (ruleset: Ruleset) => {
      dispatch(rulesetSlice.actions.setRuleset(ruleset));
    },
    [dispatch]
  );
};

export const useUpdateBattleCondition = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (battleCondition: BattleCondition) => {
      dispatch(rulesetSlice.actions.updateCondition(battleCondition));
    },
    [dispatch]
  );
};

export const useSetRulesetMana = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (mana: number) => {
      dispatch(rulesetSlice.actions.setMana(mana));
    },
    [dispatch]
  );
};

export const useSetRulesetElement = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (element: string) => {
      dispatch(rulesetSlice.actions.setElement(element as BaseElement));
    },
    [dispatch]
  );
};
