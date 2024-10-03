import {
  Stack,
  Title,
  Card,
  Paper,
  Badge,
  Group,
  CopyButton,
  Button,
} from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { indexLoader, type IndexLoader } from "./loader";

import IconCheckBoxOutline from "~icons/material-symbols/check-box-outline";
import IconCopyOutline from "~icons/material-symbols/content-copy-outline";

export const loader = indexLoader;
export const meta: MetaFunction = () => {
  return [
    { title: "Awesome yasunori web" },
    { name: "description", content: "Welcome to awesome yasunori!" },
  ];
};

export default function Index() {
  const data = useLoaderData<IndexLoader>();
  return (
    <Stack gap="lg">
      {data?.map((d) => (
        <Card
          key={d.id}
          id={`${d.id}`}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Stack mb="lg">
            <Title order={2} size="h2">
              {d.title}
            </Title>
            <Group gap="xs">
              <Badge color="pink">#{d.id}</Badge>
              <Badge color="blue">{d.senpan}</Badge>
              <Badge color="green">{d.at}</Badge>
              <Badge color="cyan">{d.date}</Badge>
            </Group>
          </Stack>
          <Paper p="md" style={{ position: "relative" }}>
            <div style={{ position: "absolute", right: "0.5rem" }}>
              <CopyButton value={d.content}>
                {({ copied, copy }) => (
                  <Button
                    size="xs"
                    style={{
                      cursor: "pointer",
                      opacity: 0.3,
                    }}
                    color="#fff"
                    onClick={copy}
                  >
                    {copied ? (
                      <IconCheckBoxOutline color="#000" />
                    ) : (
                      <IconCopyOutline color="#000" />
                    )}
                  </Button>
                )}
              </CopyButton>
            </div>
            <Markdown remarkPlugins={[remarkBreaks, remarkGfm]}>
              {d.content}
            </Markdown>
          </Paper>
        </Card>
      ))}
    </Stack>
  );
}
