import importlib.util
from pathlib import Path
import unittest

source = Path(__file__).resolve().parents[1] / 'scripts' / 'restore_network.py'
spec = importlib.util.spec_from_file_location('restore_network', source)
network = importlib.util.module_from_spec(spec)
spec.loader.exec_module(network)


def existing(*subnets):
    return [{'IPAM': {'Config': [{'Subnet': value} for value in subnets]}}]


class RecoveryNetworkTests(unittest.TestCase):
    def test_live_network_and_existing_drills_are_preserved(self):
        self.assertEqual(network.choose_prefix(existing('172.29.40.0/24', '10.200.0.0/23')), '10.200.2')

    def test_broad_routes_and_ipv6_are_handled(self):
        self.assertEqual(network.choose_prefix(existing('10.0.0.0/8', 'fd00::/64')), '172.30.0')

    def test_exhausted_pools_fail_instead_of_reusing_a_network(self):
        with self.assertRaises(ValueError):
            network.choose_prefix(existing('10.0.0.0/8', '172.16.0.0/12'))

    def test_no_networks_and_empty_ipam(self):
        self.assertEqual(network.choose_prefix([{'IPAM': {'Config': None}}]), '10.200.0')
