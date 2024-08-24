import { BaseElement, CardType, Rarity } from "src/battler/types";
import { cardFilterSlice, Damage } from "../cardFilter";
import { useAppSelector, useAppDispatch } from "../store";
import { useCallback } from "react";

export const useCardFilterType = () => useAppSelector((store) => store.cardFilter.type);
export const useCardFilterElement = () => useAppSelector((store) => store.cardFilter.element);
export const useCardFilterRarity = () => useAppSelector((store) => store.cardFilter.rarity);
export const useCardFilterMana = () => useAppSelector((store) => store.cardFilter.mana);
export const useCardFilterDamage = () => useAppSelector((store) => store.cardFilter.damageType);
export const useCardFilterSearch = () => useAppSelector((store) => store.cardFilter.search);

export const useSetCardFilterType = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (cardType: string) => {
      dispatch(cardFilterSlice.actions.setType(cardType as CardType));
    },
    [dispatch]
  );
};

export const useSetCardFilterElement = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (element: string) => {
      dispatch(cardFilterSlice.actions.setElement(element as BaseElement));
    },
    [dispatch]
  );
};

export const useSetCardFilterRarity = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (rarity: string) => {
      dispatch(cardFilterSlice.actions.setRarity(rarity as Rarity));
    },
    [dispatch]
  );
};

export const useSetCardFilterDamage = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (damage: string) => {
      dispatch(cardFilterSlice.actions.setDamage(damage as Damage));
    },
    [dispatch]
  );
};

export const useSetCardFilterMana = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (mana: number) => {
      dispatch(cardFilterSlice.actions.setMana(mana));
    },
    [dispatch]
  );
};

export const useSetCardFilterSearch = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (search: string) => {
      dispatch(cardFilterSlice.actions.setSearch(search));
    },
    [dispatch]
  );
};
