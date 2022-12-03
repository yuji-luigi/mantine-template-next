import { useEffect, useState } from "react";
import { createStyles, Navbar, Group, Code, ScrollArea } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import useLayoutContext from "../../hooks/useLayoutContext";
import useAuth from "../../hooks/useAuth";
import { sectionData, sectionDataBeta } from "../../data";

import { Icons } from "../../data/icons/index";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon") as string;
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      textDecoration: "none",
    },

    linkLabel: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

type NavbarConfig = { link: string; label: string; icon: TablerIcon };
// const navBarConfig: NavbarConfig[] = [];

// Object.keys(sectionData).forEach((key: string): void => {
//   const typedKey = key as Sections;
//   const config: NavbarConfig = {
//     link: sectionData[typedKey].link,
//     label: sectionData[typedKey].navbarTitle,
//     icon: /*  Icons[sectionData[typedKey].slice as IconsType] || Icons, */ Icons.home,
//   };
//   navBarConfig.push(config);
// });

export function NavbarVertical() {
  const { classes, cx } = useStyles();
  const { logout } = useAuth();
  const [active, setActive] = useState("");
  const { isOpen } = useLayoutContext();
  const { asPath } = useRouter();

  const linksBeta = sectionDataBeta.map((section) => (
    <>
      <p>{section.name}</p>
      {section.contents.map((navbarContent) => {
        const Icon = Icons[navbarContent.slice as IconIndexTypes] || Icons.home;
        return (
          <Link
            className={classes.link}
            href={navbarContent.link}
            key={navbarContent.navbarTitle}
            onClick={(event) => {
              setActive(navbarContent.navbarTitle);
            }}
          >
            <div
              className={cx(classes.linkLabel, {
                [classes.linkActive]: navbarContent.link === active,
              })}
            >
              <Icon className={classes.linkIcon} stroke={1.5} />
              {navbarContent.navbarTitle}
            </div>
          </Link>
        );
      })}
    </>
  ));

  // const links = navBarConfig.map((item) => (
  //   <a
  //     className={cx(classes.link, { [classes.linkActive]: item.link === active })}
  //     href={item.link}
  //     key={item.label}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       setActive(item.link);
  //       push(item.link);
  //     }}
  //   >
  //     <item.icon className={classes.linkIcon} stroke={1.5} />
  //     <span>{item.label}</span>
  //   </a>
  // ));

  useEffect(() => setActive(asPath), [asPath]);

  return (
    <Navbar
      fixed
      hidden={!isOpen}
      hiddenBreakpoint="md"
      width={{ sm: 300 }}
      p="md"
    >
      <ScrollArea>
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            {/* <MantineLogo size={28} /> */}
            <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
          </Group>
          {linksBeta.map((navbarData) => navbarData)}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <Icons.switch className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>
          <a href="#" className={classes.link} onClick={logout}>
            <Icons.logout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  );
}