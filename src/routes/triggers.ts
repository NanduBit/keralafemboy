import { Hono } from 'hono';
import type {
  OnAppInstallRequest,
  OnPostSubmitRequest,
  OnCommentSubmitRequest,
  TriggerResponse,
} from '@devvit/web/shared';
import { reddit } from '@devvit/web/server';

export const triggers = new Hono();

triggers.post('/on-app-install', async (c) => {
  const input = await c.req.json<OnAppInstallRequest>();

  console.log('[TRIGGER] APP INSTALL TEST - IT WORKS');
  console.log(JSON.stringify(input));

  return c.json<TriggerResponse>({ status: 'success' }, 200);
});

triggers.post('/on-post-submit', async (c) => {
  console.log('[TRIGGER] POST SUBMIT FIRED');

  const input = await c.req.json<OnPostSubmitRequest>();
  const post = input.post;

  if (post?.authorId) {
    try {
      const user = await reddit.getUserById(
        post.authorId as `t2_${string}`
      );

      if (user?.username) {
        const flair = await user.getUserFlairBySubreddit(
          'TeenKerala'
        );

        if (!flair?.flairText) {
          await reddit.sendPrivateMessage({
            to: user.username,
            subject: '   ',
            text: 'We see that you have posted in r/TeenKerala. Please equip an appropriate user flair.',
          });

          console.log('[DM SENT] Post author:', user.username);
        } else {
          console.log(
            '[HAS FLAIR] Skipping DM:',
            user.username,
            '\nhas flair: ',
            flair
          );
        }
      }
    } catch (error) {
      console.error('[DM ERROR]', error);
    }
  }

  return c.json<TriggerResponse>({ status: 'success' }, 200);
});

triggers.post('/on-comment-submit', async (c) => {
  console.log('[TRIGGER] COMMENT SUBMIT FIRED');

  const input = await c.req.json<OnCommentSubmitRequest>();
  const comment = input.comment;

  if (comment?.author) {
    try {
      const user = await reddit.getUserById(
        comment.author as `t2_${string}`
      );

      if (user?.username) {
        const flair = await user.getUserFlairBySubreddit(
          'TeenKerala'
        );

        console.log('[FLAIR]', flair);

        if (!flair?.flairText) {
          await reddit.sendPrivateMessage({
            to: user.username,
            subject: '   ',
            text: 'We see that you have commented in r/TeenKerala. Please equip an appropriate user flair.',
          });

          console.log(
            '[DM SENT] Comment author:',
            user.username
          );
        } else {
          console.log(
            '[HAS FLAIR] Skipping DM:',
            user.username,
            '\nhas flair: ',
            flair
          );
        }
      }
    } catch (error) {
      console.error('[COMMENT DM ERROR]', error);
    }
  }

  return c.json<TriggerResponse>({ status: 'success' }, 200);
});