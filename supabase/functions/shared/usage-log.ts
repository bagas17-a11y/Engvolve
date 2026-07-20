/**
 * AI Usage Logging
 * Records Claude API token usage per user/endpoint for cost visibility.
 * Uses the service role key so it bypasses RLS — this is an internal
 * analytics table, not something the calling user can read directly.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function logAiUsage(params: {
  userId: string;
  endpoint: string;
  model: string;
  inputTokens?: number;
  outputTokens?: number;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials for AI usage logging');
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error } = await supabase.from('ai_usage_log').insert({
      user_id: params.userId,
      endpoint: params.endpoint,
      model: params.model,
      input_tokens: params.inputTokens ?? 0,
      output_tokens: params.outputTokens ?? 0,
      metadata: params.metadata ?? null,
    });

    if (error) console.error('Failed to log AI usage:', error);
  } catch (error) {
    // Never let usage logging break the actual request.
    console.error('AI usage logging exception:', error);
  }
}
