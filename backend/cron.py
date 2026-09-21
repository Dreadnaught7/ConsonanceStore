from common import queue_job


def main() -> None:
    job = queue_job(
        "system_heartbeat",
        {
            "source": "consonance-scheduler",
            "purpose": "Verify the daily scheduler-to-worker path.",
        },
    )
    print(f"Queued scheduled heartbeat job: {job.get('id')}")


if __name__ == "__main__":
    main()
