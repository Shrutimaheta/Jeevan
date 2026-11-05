"""Choose a recovery subnet that does not overlap existing Docker networks."""
import ipaddress
import json
import sys


def choose_prefix(networks):
    occupied = [
        ipaddress.ip_network(config['Subnet'], strict=False)
        for network in networks
        for config in network.get('IPAM', {}).get('Config', []) or []
        if config.get('Subnet')
    ]
    for pool in ('10.200.0.0/16', '172.30.0.0/16'):
        for candidate in ipaddress.ip_network(pool).subnets(new_prefix=24):
            if not any(candidate.overlaps(existing) for existing in occupied if existing.version == 4):
                return str(candidate.network_address).rsplit('.', 1)[0]
    raise ValueError('No unused recovery subnet is available in the recovery address pools.')


if __name__ == '__main__':
    print(choose_prefix(json.load(sys.stdin)))
