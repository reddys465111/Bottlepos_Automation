import { test, expect } from '@playwright/test';
import { ApiTestContext } from '../../../src/API/apiTestContext';
import { EndPoint } from '../../../src/API/utils/endPoints';

/** Tax rules object from GET /api/adminconfig/get (IAdminConfig → data.tax.rules, or double-wrapped data). */
function getTaxRulesFromAdminBody(body: unknown): Record<string, Record<string, unknown>> | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const root = body as Record<string, unknown>;
  const layer1 = root.data;
  if (!layer1 || typeof layer1 !== 'object') return undefined;
  const l1 = layer1 as Record<string, unknown>;
  const tax1 = l1.tax;
  if (tax1 && typeof tax1 === 'object') {
    const rules = (tax1 as { rules?: unknown }).rules;
    if (rules && typeof rules === 'object' && !Array.isArray(rules)) {
      return rules as Record<string, Record<string, unknown>>;
    }
  }
  /** Some responses nest config again: { data: { data: IACData } } (matches TaxRules_List’s data.data.tax). */
  const layer2 = l1.data;
  if (layer2 && typeof layer2 === 'object') {
    const tax2 = (layer2 as Record<string, unknown>).tax;
    if (tax2 && typeof tax2 === 'object') {
      const rules = (tax2 as { rules?: unknown }).rules;
      if (rules && typeof rules === 'object' && !Array.isArray(rules)) {
        return rules as Record<string, Record<string, unknown>>;
      }
    }
  }
  return undefined;
}

function isDefaultTaxFlag(value: unknown): boolean {
  return (
    value === true ||
    value === 1 ||
    value === '1' ||
    value === 'true' ||
    value === 'True'
  );
}

function findDefaultTaxRule(adminJson: unknown): Record<string, unknown> | undefined {
  const rules = getTaxRulesFromAdminBody(adminJson);
  if (!rules) return undefined;
  for (const rule of Object.values(rules)) {
    if (rule && typeof rule === 'object' && isDefaultTaxFlag(rule.isdefaulttax)) {
      return rule;
    }
  }
  return undefined;
}

test.describe('API – ADMIN TaxRule', { tag: ['@api', '@admin', '@taxRules'] }, () => {
  test.beforeAll(async () => {
    await ApiTestContext.init();
  });

  test('[API] POST /api/tax/rules/add – TaxRule add returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxRule.Add, {
      name: 'API Test Tax Rule',
      isdefaulttax: false,
      base: [],
      locations: {},
      inclusive: true,
      mode: 'single',
      posbutton: { button: '', buttoncolor: '#ac725e' },
    });
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/tax/rules/edit – TaxRule edit returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxRule.Edit, {
      id: '1',
      name: 'API Test Tax Rule',
      isdefaulttax: false,
      inclusive: true,
      mode: 'single',
      base: [],
      locations: {},
      posbutton: { button: '', buttoncolor: '#ac725e' },
    });
    expect(response.status()).toBe(200);
  });

  test('[API] POST /api/tax/rules/edit – TaxRule edit default rule returns 200', {
    tag: ['@edit', '@defaultRule'],
  }, async ({ request }) => {
    const configRes = await ApiTestContext.GET(request, EndPoint.AdminConfig.Get);
    expect(configRes.status(), 'AdminConfig get should return 200').toBe(200);
    const adminJson = await configRes.json();
    const defaultRule = findDefaultTaxRule(adminJson);
    if (!defaultRule?.id) {
      test.skip(true, 'No default tax rule found in admin config; cannot run edit default rule test');
      return;
    }
    const posbutton = defaultRule.posbutton as Record<string, unknown> | undefined;
    const editPayload = {
      id: String(defaultRule.id),
      name: String(defaultRule.name ?? ''),
      inclusive: Boolean(defaultRule.inclusive),
      isdefaulttax: true,
      mode: String(defaultRule.mode ?? 'single'),
      base: Array.isArray(defaultRule.base) ? defaultRule.base : [],
      locations:
        defaultRule.locations && typeof defaultRule.locations === 'object'
          ? defaultRule.locations
          : {},
      posbutton: {
        taxid: posbutton?.taxid != null ? String(posbutton.taxid) : '',
        button: String(posbutton?.button ?? ''),
        buttoncolor: String(posbutton?.buttoncolor ?? '#ac725e'),
      },
    };
    const response = await ApiTestContext.POST(request, EndPoint.TaxRule.Edit, editPayload);
    expect(response.status(), 'TaxRule edit default rule should return 200').toBe(200);
  });

  test('[API] POST /api/tax/rules/delete – TaxRule delete returns 200', async ({ request }) => {
    const response = await ApiTestContext.POST(request, EndPoint.TaxRule.delete, { id: '1' });
    expect(response.status()).toBe(200);
  });
});
