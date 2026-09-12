# EmailVerification SDK test runner

from __future__ import annotations
import os
import json

from projectname_sdk.utility.voxgig_struct import voxgig_struct as vs


class EmailVerificationTestRunner:
    _env = {}

    @staticmethod
    def load_env_local():
        try:
            with open("../../.env.local", "r") as f:
                content = f.read()
        except (FileNotFoundError, IOError):
            return

        for line in content.splitlines():
            line = line.strip()
            if line == "" or line.startswith("#"):
                continue
            eq_idx = line.find("=")
            if eq_idx < 0:
                continue
            key = line[:eq_idx].strip()
            val = line[eq_idx + 1:].strip()
            EmailVerificationTestRunner._env[key] = val

    @staticmethod
    def getenv(key):
        val = EmailVerificationTestRunner._env.get(key)
        if val is not None:
            return val
        return os.environ.get(key)

    @staticmethod
    def env_override(m):
        live = EmailVerificationTestRunner.getenv("PROJECTENV_TEST_LIVE")
        override = EmailVerificationTestRunner.getenv("PROJECTENV_TEST_OVERRIDE")

        if live == "TRUE" or override == "TRUE":
            for key in list(m.keys()):
                envval = EmailVerificationTestRunner.getenv(key)
                if envval is not None and envval != "":
                    envval = envval.strip()
                    if envval.startswith("{"):
                        try:
                            parsed = json.loads(envval)
                            if parsed is not None:
                                m[key] = parsed
                                continue
                        except Exception:
                            pass
                    m[key] = envval

        explain = EmailVerificationTestRunner.getenv("PROJECTENV_TEST_EXPLAIN")
        if explain is not None and explain != "":
            m["PROJECTENV_TEST_EXPLAIN"] = explain

        return m

    _test_control = None

    @staticmethod
    def load_test_control():
        """Load sdk-test-control.json from this test dir; cache after first read.
        Returns a dict with the empty-skip default if the file is missing or invalid
        so tests never crash on a bad config.
        """
        if EmailVerificationTestRunner._test_control is not None:
            return EmailVerificationTestRunner._test_control
        ctrl_path = os.path.join(os.path.dirname(__file__), "sdk-test-control.json")
        try:
            with open(ctrl_path, "r") as f:
                EmailVerificationTestRunner._test_control = json.load(f)
        except (FileNotFoundError, IOError, ValueError):
            EmailVerificationTestRunner._test_control = {
                "version": 1,
                "test": {"skip": {
                    "live": {"direct": [], "entityOp": []},
                    "unit": {"direct": [], "entityOp": []},
                }},
            }
        return EmailVerificationTestRunner._test_control

    @staticmethod
    def is_control_skipped(kind, name, mode):
        """Check sdk-test-control.json for a skip entry. Returns (skip, reason)."""
        ctrl = EmailVerificationTestRunner.load_test_control()
        skip = ctrl.get("test", {}).get("skip", {}).get(mode, {}) or {}
        items = skip.get(kind, []) or []
        for item in items:
            if kind == "direct" and item.get("test") == name:
                return True, item.get("reason")
            if kind == "entityOp":
                key = (item.get("entity") or "") + "." + (item.get("op") or "")
                if key == name:
                    return True, item.get("reason")
        return False, None

    @staticmethod
    def live_client_options():
        """Extra SDK options every LIVE client is constructed with, from
        sdk-test-control.json `test.client.options`.

        The generated live client knows two things: the base URL (from the
        spec) and the credential (from the environment). Everything else
        about how a particular API wants to be talked to - which features to
        switch on, and with what settings - is a property of THAT API, known
        to the project and to nothing in the toolchain.

        Merged UNDER the generated fields, so the suite's own
        base/apikey/server values win: this ADDS to the live client, it does
        not redirect it.

        Reserved fields are stripped HERE rather than at each merge site:
        the generated dict only names a field when the model calls for one,
        so a "base" in this block would face no competing value and would
        silently redirect the whole suite - credential included - to another
        host.
        """
        ctrl = EmailVerificationTestRunner.load_test_control()
        opts = ctrl.get("test", {}).get("client", {}).get("options")
        if not isinstance(opts, dict):
            return {}
        reserved = ("base", "prefix", "suffix", "server", "apikey", "secret")
        return {k: v for k, v in opts.items() if k not in reserved}

    @staticmethod
    def live_delay_ms():
        """Per-test live pacing delay (ms); default 500."""
        ctrl = EmailVerificationTestRunner.load_test_control()
        v = ctrl.get("test", {}).get("live", {}).get("delayMs")
        if isinstance(v, int) and v >= 0:
            return v
        return 500

    @staticmethod
    def entity_data(v):
        """Extract the data map from an op result.

        Every entity operation resolves to the ENTITY (see AGENTS.md), so a
        flow test that wants the record takes this hop. A plain dict passes
        through unchanged.
        """
        if hasattr(v, "data_get") and callable(v.data_get):
            return v.data_get()
        return v

    def entity_list_to_data(lst):
        out = []
        for item in lst:
            if isinstance(item, dict):
                out.append(item)
            elif hasattr(item, "data_get") and callable(item.data_get):
                d = item.data_get()
                if isinstance(d, dict):
                    out.append(d)
            else:
                out.append(item)
        return out


# Module-level convenience functions.
def load_env_local():
    EmailVerificationTestRunner.load_env_local()


def env_override(m):
    return EmailVerificationTestRunner.env_override(m)


def entity_data(v):
    return EmailVerificationTestRunner.entity_data(v)


def entity_list_to_data(lst):
    return EmailVerificationTestRunner.entity_list_to_data(lst)


def is_control_skipped(kind, name, mode):
    return EmailVerificationTestRunner.is_control_skipped(kind, name, mode)


def load_test_control():
    return EmailVerificationTestRunner.load_test_control()


def live_client_options():
    return EmailVerificationTestRunner.live_client_options()


def live_delay_ms():
    return EmailVerificationTestRunner.live_delay_ms()
