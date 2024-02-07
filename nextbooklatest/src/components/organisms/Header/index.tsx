/* eslint-disable import/order */
import Link from "next/link";
import styled from "styled-components";
import AppLogo from "components/atoms/AppLogo";
import Button from "components/atoms/Button";
import {
  SearchIcon,
  PersonIcon,
  ShoppingCartIcon,
} from "components/atoms/IconButton";
import ShapeImage from "components/atoms/ShapeImage";
import Spinner from "components/atoms/Spinner";
import Text from "components/atoms/Text";
import Box from "components/layout/Box";
import Flex from "components/layout/Flex";
import BadgeIconButton from "components/molecules/BadgeIconButton";
// eslint-disable-next-line import/order
import { useShoppingCartContext } from "components/contexts/ShoppingCartContext";
import { useAuthContext } from "components/contexts/AuthContext";
// import { useAuthContext } from "components/contexts/AuthContext";

// import { useAuthContext } from "contexts/AuthContext";
// import { useShoppingCartContext } from "contexts/ShoppingCartContext";

// 헤더 루트
const HeaderRoot = styled.header`
  height: 88px;
  padding: 0px;
  border-bottom: 1px solid;
`;

// 내비게이션
const Nav = styled(Flex)`
  & > span:not(:first-child) {
    /* margin-left: ${({ theme }) => theme.space["2"]}; */
  }
`;

// 내비게이션 링크
const NavLink = styled.span`
  display: inline;
`;

// 앵커
const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * 헤더
 */
const Header = () => {
  const { cart } = useShoppingCartContext();
  const { authUser, isLoading } = useAuthContext();

  return (
    <HeaderRoot>
      <Flex paddingLeft={3} paddingRight={3} justifyContent="space-between">
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Link href="/" passHref legacyBehavior>
              <Anchor as="a">
                <AppLogo />
              </Anchor>
            </Link>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search" passHref legacyBehavior>
                <Anchor as="a">모두</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/clothes" passHref legacyBehavior>
                <Anchor as="a">의류</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/book" passHref legacyBehavior>
                <Anchor as="a">책</Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Box display={{ base: "none", md: "block" }}>
              <Link href="/search/shoes" passHref legacyBehavior>
                <Anchor as="a">신발</Anchor>
              </Link>
            </Box>
          </NavLink>
        </Nav>
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Box display={{ base: "block", md: "none" }}>
              <Link href="/search" passHref legacyBehavior>
                <Anchor as="a">
                  <SearchIcon />
                </Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Link href="/cart" passHref legacyBehavior>
              <Anchor as="a">
                <BadgeIconButton
                  icon={<ShoppingCartIcon size={24} />}
                  size="24px"
                  badgeContent={cart.length === 0 ? undefined : cart.length}
                  badgeBackgroundColor="#ed9f28"
                />
              </Anchor>
            </Link>
          </NavLink>
          <NavLink>
            {(() => {
              // 인증된 상태라면 아이콘을 표시
              if (authUser) {
                return (
                  <Link href={`/users/${authUser.id}`} passHref legacyBehavior>
                    <Anchor as="a">
                      <ShapeImage
                        shape="circle"
                        src={authUser.profileImageUrl}
                        width={24}
                        height={24}
                        data-testid="profile-shape-image"
                        alt={""}
                      />
                    </Anchor>
                  </Link>
                );
              } else if (isLoading) {
                // 로드 중에는 스피너를 표시
                return <Spinner size={20} strokeWidth={2} />;
              } else {
                // 로그인 하지 않은 경우에는 아이콘을 표시
                return (
                  <Link href="/signin" passHref legacyBehavior>
                    <Anchor as="a">
                      <PersonIcon size={24} />
                    </Anchor>
                  </Link>
                );
              }
            })()}
          </NavLink>
          <NavLink>
            <Link href="/sell" passHref legacyBehavior>
              <Button as="a">등록</Button>
            </Link>
          </NavLink>
        </Nav>
      </Flex>
    </HeaderRoot>
  );
};

export default Header;
