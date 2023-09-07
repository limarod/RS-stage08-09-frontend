import { styled } from "styled-components";

export const Container = styled.button`
  border: none;
  background: none;
  font-size: 16px;

  color: ${({theme, isactive}) => isactive ?  theme.COLORS.GRAY_100 : theme.COLORS.ORANGE };
`;