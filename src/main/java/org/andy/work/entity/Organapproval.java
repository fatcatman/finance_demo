package org.andy.work.entity;

// Generated 2015-2-3 10:43:00 by Hibernate Tools 4.0.0

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import sun.util.calendar.LocalGregorianCalendar;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Approval created by tianlei
 */
@Entity
@Table(name = "t_organapproval", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Organapproval implements java.io.Serializable {

	/**
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private Organ Organ;
	@JsonProperty
	private Approval Approval;

	public Organapproval() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	@JsonIgnore
	public int getID() {
		return this.ID;
	}

	public void setID(int ID) {
		this.ID = ID;
	}

	@ManyToOne(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="Organ", nullable = true)
	@JsonIgnore
	public Organ getOrgan() {
		return this.Organ;
	}

	public void setOrgan(Organ Organ) {
		this.Organ = Organ;
	}


	@ManyToOne(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn(name="Approval", nullable = true)
	@JsonIgnore
	public Approval getApproval() {
		return this.Approval;
	}

	public void setApproval(Approval Approval) {
		this.Approval = Approval;
	}

}
