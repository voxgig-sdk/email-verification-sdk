"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('VerifyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EMAIL_VERIFICATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EMAIL_VERIFICATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EmailVerificationSDK.test();
        const ent = testsdk.Verify();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EMAIL_VERIFICATION_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'verify.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "credits_remaining", "req": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "credits_used", "req": true, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "format": "email", "name": "email", "req": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "message", "req": true, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "result", "req": true, "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "uri", "name": "upgrade_url", "req": false, "short": "Included when credits are low or exhausted.", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "valid", "req": true, "short": "True when VerifyMail classifies the address as valid.", "type": "`$BOOLEAN`", "index$": 6 }], "name": "verify", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "user@example.com", "kind": "query", "name": "email", "orig": "email", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "vm_your_api_key", "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /api/verify", "json": "{\"operationId\":\"verifyEmail\",\"parameters\":[{\"description\":\"Email address to verify.\",\"in\":\"query\",\"name\":\"email\",\"required\":true,\"schema\":{\"example\":\"user@example.com\",\"format\":\"email\",\"type\":\"string\"}},{\"description\":\"VerifyMail API key. Buy Starter access at the pricing URL.\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"example\":\"vm_your_api_key\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"credits_remaining\":49,\"credits_used\":1,\"email\":\"user@example.com\",\"message\":\"Mailbox is deliverable according to verification checks.\",\"result\":\"valid\",\"valid\":true},\"schema\":{\"properties\":{\"credits_remaining\":{\"minimum\":0,\"type\":\"integer\"},\"credits_used\":{\"minimum\":0,\"type\":\"integer\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"result\":{\"enum\":[\"valid\",\"invalid\",\"risky\"],\"type\":\"string\"},\"upgrade_url\":{\"description\":\"Included when credits are low or exhausted.\",\"example\":\"https://checkout.nanocorp.so/c/gtZlEkHwBzQ8yFAjqbFh\",\"format\":\"uri\",\"type\":\"string\"},\"valid\":{\"description\":\"True when VerifyMail classifies the address as valid. False when invalid or risky.\",\"type\":\"boolean\"}},\"required\":[\"valid\",\"email\",\"result\",\"message\",\"credits_remaining\",\"credits_used\"],\"type\":\"object\"}}},\"description\":\"Email verification result.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_remaining\":{\"minimum\":0,\"type\":\"integer\"},\"credits_used\":{\"minimum\":0,\"type\":\"integer\"},\"error\":{\"type\":\"string\"},\"trial_exhausted\":{\"description\":\"True when a trial/demo key has hit its limit.\",\"type\":\"boolean\"},\"upgrade_message\":{\"description\":\"Human-readable upgrade guidance including price and payment link.\",\"type\":\"string\"},\"upgrade_url\":{\"example\":\"https://checkout.nanocorp.so/c/gtZlEkHwBzQ8yFAjqbFh\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Missing or invalid email query parameter.\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_remaining\":{\"minimum\":0,\"type\":\"integer\"},\"credits_used\":{\"minimum\":0,\"type\":\"integer\"},\"error\":{\"type\":\"string\"},\"trial_exhausted\":{\"description\":\"True when a trial/demo key has hit its limit.\",\"type\":\"boolean\"},\"upgrade_message\":{\"description\":\"Human-readable upgrade guidance including price and payment link.\",\"type\":\"string\"},\"upgrade_url\":{\"example\":\"https://checkout.nanocorp.so/c/gtZlEkHwBzQ8yFAjqbFh\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Missing or invalid API key.\"},\"402\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_remaining\":{\"minimum\":0,\"type\":\"integer\"},\"credits_used\":{\"minimum\":0,\"type\":\"integer\"},\"error\":{\"type\":\"string\"},\"trial_exhausted\":{\"description\":\"True when a trial/demo key has hit its limit.\",\"type\":\"boolean\"},\"upgrade_message\":{\"description\":\"Human-readable upgrade guidance including price and payment link.\",\"type\":\"string\"},\"upgrade_url\":{\"example\":\"https://checkout.nanocorp.so/c/gtZlEkHwBzQ8yFAjqbFh\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Trial limit or credits exhausted. Upgrade at the payment URL.\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/verify", "segments": [{ "lit": "api" }, { "lit": "verify" }], "select": { "exist": ["email", "key"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "verify", "name__orig": "verify", "Name": "Verify", "name_": "verify", "name-": "verify", "NAME": "VERIFY", "index$": 0 }, { "active": true, "entity": "verify", "key$": "BasicVerifyFlow", "kind": "basic", "name": "BasicVerifyFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "verify_ref01", "srcdatavar": "verify_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-verify_ref01" } }], "index$": 0 }] }, 'Verify');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let verify_ref01_data = Object.values(setup.data.existing.verify)[0];
        // LOAD
        const verify_ref01_ent = client.Verify();
        const verify_ref01_match_dt0 = {};
        const verify_ref01_data_dt0 = (await verify_ref01_ent.load(verify_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != verify_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/verify/VerifyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EmailVerificationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['verify01', 'verify02', 'verify03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EMAIL_VERIFICATION_TEST_VERIFY_ENTID': idmap,
        'EMAIL_VERIFICATION_TEST_LIVE': 'FALSE',
        'EMAIL_VERIFICATION_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['EMAIL_VERIFICATION_TEST_VERIFY_ENTID'];
    const live = 'TRUE' === env.EMAIL_VERIFICATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EMAIL_VERIFICATION_TEST_VERIFY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.EmailVerificationSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.EMAIL_VERIFICATION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=VerifyEntity.test.js.map