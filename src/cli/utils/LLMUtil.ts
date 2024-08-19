import { AzureChatOpenAI } from '@langchain/azure-openai';
import { LLMModelDetails, LLMModels } from '../../types.js';

export const models: Record<LLMModels, LLMModelDetails> = {
  [LLMModels.GPT3]: {
    name: LLMModels.GPT3,
    inputCostPer1KTokens: 0.0015,
    outputCostPer1KTokens: 0.002,
    maxLength: 3050,
    llm: new AzureChatOpenAI({
      temperature: 0.1,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: LLMModels.GPT3,
    }),
    inputTokens: 0,
    outputTokens: 0,
    succeeded: 0,
    failed: 0,
    total: 0,
  },
  [LLMModels.GPT4]: {
    name: LLMModels.GPT4,
    inputCostPer1KTokens: 0.03,
    outputCostPer1KTokens: 0.06,
    maxLength: 8192,
    llm: new AzureChatOpenAI({
      temperature: 0.1,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: LLMModels.GPT4,
    }),
    inputTokens: 0,
    outputTokens: 0,
    succeeded: 0,
    failed: 0,
    total: 0,
  },
  [LLMModels.GPT432k]: {
    name: LLMModels.GPT432k,
    inputCostPer1KTokens: 0.06,
    outputCostPer1KTokens: 0.12,
    maxLength: 32768,
    llm: new AzureChatOpenAI({
      temperature: 0.1,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: LLMModels.GPT4,
    }),
    inputTokens: 0,
    outputTokens: 0,
    succeeded: 0,
    failed: 0,
    total: 0,
  },
  [LLMModels.GPT4o]: {
    name: LLMModels.GPT4o,
    inputCostPer1KTokens: 0.005,
    outputCostPer1KTokens: 0.015,
    maxLength: 4096,
    llm: new AzureChatOpenAI({
      temperature: 0.1,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: LLMModels.GPT4o,
    }),
    inputTokens: 0,
    outputTokens: 0,
    succeeded: 0,
    failed: 0,
    total: 0,
  },
  [LLMModels.GPT4omini]: {
    name: LLMModels.GPT4omini,
    inputCostPer1KTokens: 0.00015,
    outputCostPer1KTokens: 0.0006,
    maxLength: 16384,
    llm: new AzureChatOpenAI({
      temperature: 0.1,
      modelName: LLMModels.GPT4omini,
      azureOpenAIEndpoint: process.env.AZURE_OPENAI_API_ENDPOINT,
      azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      azureOpenAIApiDeploymentName:
        process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    }),
    inputTokens: 0,
    outputTokens: 0,
    succeeded: 0,
    failed: 0,
    total: 0,
  },
};

export const printModelDetails = (models: LLMModelDetails[]): void => {
  const output = models.map((model) => {
    return {
      Model: model.name,
      'File Count': model.total,
      Succeeded: model.succeeded,
      Failed: model.failed,
      Tokens: model.inputTokens + model.outputTokens,
      Cost:
        (model.inputTokens / 1000) * model.inputCostPer1KTokens +
        (model.outputTokens / 1000) * model.outputCostPer1KTokens,
    };
  });

  const totals = output.reduce(
    (cur: any, next) => {
      return {
        ...cur,
        'File Count': cur['File Count'] + next['File Count'],
        Succeeded: cur.Succeeded + next.Succeeded,
        Failed: cur.Failed + next.Failed,
        Tokens: cur.Tokens + next.Tokens,
        Cost: cur.Cost + next.Cost,
      };
    },
    {
      Model: 'Total',
      'File Count': 0,
      Succeeded: 0,
      Failed: 0,
      Tokens: 0,
      Cost: 0,
    },
  );

  const all = [...output, totals];
  console.table(all);
};

export const totalIndexCostEstimate = (models: LLMModelDetails[]): number => {
  const totalCost = models.reduce((cur, model) => {
    return (
      cur +
      (model.inputTokens / 1000) * model.inputCostPer1KTokens +
      (model.outputTokens / 1000) * model.outputCostPer1KTokens
    );
  }, 0);

  return totalCost;
};
